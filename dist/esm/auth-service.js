import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v7 as uuidV7 } from 'uuid';
import HttpErrors from 'http-errors';
import { RoleModel } from './models/index.js';
import { UserModel } from './models/index.js';
import { createError } from './utils/index.js';
import { AuthSession } from './auth-session.js';
import { BaseRoleModel } from './models/index.js';
import { BaseUserModel } from './models/index.js';
import { removeEmptyKeys } from './utils/index.js';
import { authLocalizer } from './auth-localizer.js';
import { AuthLocalizer } from './auth-localizer.js';
import { TrieRouter } from '@e22m4u/js-trie-router';
import { AccessTokenModel } from './models/index.js';
import { DatabaseSchema } from '@e22m4u/js-repository';
import { BaseAccessTokenModel } from './models/index.js';
import { DefinitionRegistry } from '@e22m4u/js-repository';
import { DebuggableService } from './debuggable-service.js';
import { emailFormatValidator } from './validators/index.js';
import { phoneFormatValidator } from './validators/index.js';
import { passwordFormatValidator } from './validators/index.js';
import { usernameFormatValidator } from './validators/index.js';
import { getModelDefinitionFromClass } from '@e22m4u/js-repository-decorators';
/**
 * Auth model list.
 */
const AUTH_MODEL_LIST = [
    BaseRoleModel,
    BaseUserModel,
    BaseAccessTokenModel,
    RoleModel,
    UserModel,
    AccessTokenModel,
];
/**
 * Login id names.
 */
export const LOGIN_ID_NAMES = ['username', 'email', 'phone'];
/**
 * Lower case login id names.
 */
export const LOWER_CASE_LOGIN_ID_NAMES = [
    'username',
    'email',
    'phone',
];
/**
 * Default auth options.
 */
export const DEFAULT_AUTH_OPTIONS = {
    passwordHashRounds: 12,
    usernameFormatValidator,
    emailFormatValidator,
    phoneFormatValidator,
    passwordFormatValidator,
    jwtSecret: 'REPLACE_ME!',
    jwtTtl: 14 * 86400, // 14 days
    jwtHeaderName: 'authorization',
    jwtCookieName: 'accessToken',
    jwtQueryParam: 'accessToken',
    sessionUserInclusion: 'roles',
};
/**
 * Pre handler hook.
 *
 * @param ctx
 */
async function preHandlerHook(ctx) {
    // инъекция экземпляра переводчика в контейнер контекста запроса
    const localizer = authLocalizer.cloneWithLocaleFromRequest(ctx.req);
    ctx.container.set(AuthLocalizer, localizer);
    // в контейнере запроса нет AuthService, но сервис есть в контейнере
    // приложения, который является родителем для контейнера запроса,
    // поэтому извлечение AuthService из контейнера запроса возвращает
    // существующий экземпляр из своего родителя (контейнера приложения)
    const rootAuthService = ctx.container.getRegistered(AuthService);
    // далее выполняется клонирование AuthService с включением текущего
    // контекста запроса в новый экземпляр сервиса
    const authService = rootAuthService.cloneWithRequestContext(ctx);
    // чтобы расширенная копия сервиса авторизации была доступна
    // в обработчиках маршрута (вместо оригинального сервиса),
    // выполняется инъекция данной копии в контейнер запроса
    ctx.container.set(AuthService, authService);
    // инъекция пользовательской сессии в контейнер контекста запроса
    const authSession = await authService.createAuthSession(ctx);
    ctx.container.set(AuthSession, authSession);
}
/**
 * Auth service.
 */
export class AuthService extends DebuggableService {
    requestContext;
    /**
     * Options.
     */
    options = Object.assign({}, DEFAULT_AUTH_OPTIONS);
    /**
     * Constructor.
     *
     * @param container
     * @param options
     */
    constructor(container, options, requestContext) {
        super(container);
        this.requestContext = requestContext;
        if (options) {
            const filteredOptions = removeEmptyKeys(options);
            this.options = Object.assign(this.options, filteredOptions);
        }
        if (process.env.NODE_ENV === 'production' &&
            this.options.jwtSecret === 'REPLACE_ME!') {
            throw new Error('JWT secret is not set for the production environment!');
        }
    }
    /**
     * Get localizer
     */
    getLocalizer() {
        if (!this.requestContext ||
            !this.requestContext.container.has(AuthLocalizer)) {
            return authLocalizer;
        }
        return this.requestContext.container.getRegistered(AuthLocalizer);
    }
    /**
     * Clone with request context.
     *
     * @param ctx
     */
    cloneWithRequestContext(ctx) {
        return new AuthService(this.container, this.options, ctx);
    }
    /**
     * Register models.
     */
    registerModels(options) {
        const debug = this.getDebuggerFor(this.registerModels);
        debug('Registering models.');
        const dbs = this.getRegisteredService(DatabaseSchema);
        const defReg = dbs.getService(DefinitionRegistry);
        AUTH_MODEL_LIST.forEach(modelCtor => {
            if (defReg.hasModel(modelCtor.name)) {
                debug('%s skipped, already registered.', modelCtor.name);
            }
            else {
                const modelDef = getModelDefinitionFromClass(modelCtor);
                dbs.defineModel({
                    ...modelDef,
                    datasource: options?.datasource,
                });
                debug('%s registered.', modelCtor.name);
            }
        });
        debug('Models registered.');
    }
    /**
     * Register hooks.
     */
    registerRequestHooks() {
        const debug = this.getDebuggerFor(this.registerRequestHooks);
        debug('Registering request hooks.');
        this.getRegisteredService(TrieRouter).addHook('preHandler', preHandlerHook);
        debug('Hooks registered.');
    }
    /**
     * Create access token.
     *
     * @param user
     */
    async createAccessToken(ownerId, patch) {
        const debug = this.getDebuggerFor(this.createAccessToken);
        debug('Creating access token.');
        debug('Owner id was %v.', ownerId);
        const data = {
            id: uuidV7(),
            ownerId,
            createdAt: new Date().toISOString(),
            ...patch,
        };
        const dbs = this.getRegisteredService(DatabaseSchema);
        const rep = dbs.getRepository(AccessTokenModel.name);
        const res = (await rep.create(data));
        debug('Access token created and saved to database.');
        return res;
    }
    /**
     * Remove access token by id.
     *
     * @param tokenId
     */
    async removeAccessTokenById(accessTokenId) {
        const debug = this.getDebuggerFor(this.removeAccessTokenById);
        debug('Removing access token by id.');
        debug('Token id was %v.', accessTokenId);
        const dbs = this.getRegisteredService(DatabaseSchema);
        const rep = dbs.getRepository(AccessTokenModel.name);
        const res = await rep.deleteById(accessTokenId);
        if (res) {
            debug('Access token removed from database.');
        }
        else {
            debug('Access token not found.');
        }
        return res;
    }
    /**
     * Issue JSON Web Token.
     *
     * @param accessToken
     */
    issueJwt(accessToken) {
        const debug = this.getDebuggerFor(this.issueJwt);
        debug('Issuing JWT.');
        debug('Token id was %v.', accessToken.id);
        debug('Owner id was %v.', accessToken.ownerId);
        const payload = { uid: accessToken.ownerId, tid: accessToken.id };
        const expiresAtInSec = Math.floor(Date.now() / 1000) + this.options.jwtTtl;
        const expiresAt = new Date(expiresAtInSec * 1000).toISOString();
        debug('Expiration date was %v.', expiresAt);
        return new Promise((res, rej) => {
            jwt.sign(payload, this.options.jwtSecret, { algorithm: 'HS256', expiresIn: this.options.jwtTtl }, (err, token) => {
                if (err || !token) {
                    console.error(err);
                    return rej(createError(HttpErrors.InternalServerError, 'TOKEN_ENCODING_FAILED', 'Unable to encode JSON web token', payload));
                }
                debug('Token was %v.', token);
                debug('Token created.');
                res({ token, expiresAt });
            });
        });
    }
    /**
     * Decode Jwt.
     *
     * @param jwToken
     */
    async decodeJwt(jwToken) {
        const debug = this.getDebuggerFor(this.decodeJwt);
        debug('Decoding JWT.');
        let error;
        let payload;
        try {
            payload = await new Promise((res, rej) => {
                jwt.verify(jwToken, this.options.jwtSecret, (err, decoded) => {
                    if (err)
                        return rej(err);
                    res(decoded);
                });
            });
        }
        catch (err) {
            error = err;
        }
        if (error ||
            !payload ||
            typeof payload !== 'object' ||
            !('uid' in payload) ||
            !('tid' in payload) ||
            !payload.uid ||
            !payload.tid) {
            console.error(error);
            throw createError(HttpErrors.InternalServerError, 'TOKEN_VERIFYING_FAILED', 'Unable to verify JSON web token', { token: jwToken, payload });
        }
        debug.inspect('Payload:', payload);
        debug('Token decoded successfully.');
        return payload;
    }
    /**
     * Find access token by id.
     *
     * @param jwToken
     * @param include
     */
    async findAccessTokenById(tokenId, include) {
        const debug = this.getDebuggerFor(this.findAccessTokenById);
        debug('Finding access token by id.');
        debug('Token id was %v.', tokenId);
        const dbs = this.getRegisteredService(DatabaseSchema);
        const rep = dbs.getRepository(AccessTokenModel.name);
        const accessToken = await rep.findOne({ where: { id: tokenId }, include });
        if (!accessToken)
            throw createError(HttpErrors.InternalServerError, 'ACCESS_TOKEN_NOT_FOUND', 'Access token is not found in the database', { tokenId });
        debug('Owner id was %v.', accessToken.ownerId);
        if (!accessToken.ownerId)
            throw createError(HttpErrors.Unauthorized, 'ACCESS_TOKEN_OWNER_NOT_FOUND', 'Access token has no owner', { tokenId });
        debug('Access token found.');
        return accessToken;
    }
    /**
     * Hash password.
     *
     * @param password
     */
    async hashPassword(password) {
        if (!password)
            return '';
        try {
            return bcrypt.hash(password, this.options.passwordHashRounds);
        }
        catch (error) {
            console.error(error);
            throw createError(HttpErrors.InternalServerError, 'PASSWORD_HASHING_ERROR', 'Unable to hash the given password');
        }
    }
    /**
     * Verify password.
     *
     * @param password
     * @param hash
     * @param silent
     */
    async verifyPassword(password, hash, silent = false) {
        const debug = this.getDebuggerFor(this.verifyPassword);
        const localizer = this.getLocalizer();
        const errorKeyPrefix = 'authService.verifyPassword';
        debug('Verifying password');
        let isValid = false;
        try {
            isValid = await bcrypt.compare(password, hash);
        }
        catch (error) {
            console.error(error);
            throw createError(HttpErrors.InternalServerError, 'PASSWORD_VERIFYING_ERROR', 'Unable to verify the given password');
        }
        if (!isValid) {
            if (silent)
                return false;
            throw createError(HttpErrors.BadRequest, 'PASSWORD_VERIFYING_ERROR', localizer.t(`${errorKeyPrefix}.invalidPasswordError`));
        }
        debug('Password verified.');
        return true;
    }
    /**
     * Find user by login ids.
     *
     * @param lookup
     * @param include
     * @param silent
     */
    async findUserByLoginIds(inputData, include, silent = false) {
        const debug = this.getDebuggerFor(this.findUserByLoginIds);
        debug('Finding user by login identifiers.');
        const localizer = this.getLocalizer();
        const errorKeyPrefix = 'authService.findUserByLoginIds';
        // формирование условий выборки
        const where = {};
        let hasAnyLoginId = false;
        LOGIN_ID_NAMES.forEach(name => {
            if (inputData[name] && String(inputData[name]).trim()) {
                debug('Given %s was %v.', name, inputData[name]);
                hasAnyLoginId = true;
                const idValue = LOWER_CASE_LOGIN_ID_NAMES.includes(name)
                    ? String(inputData[name]).trim().toLowerCase()
                    : String(inputData[name]).trim();
                where[name] = idValue;
            }
        });
        // если ни один идентификатор не определен,
        // то выбрасывается ошибка
        if (!hasAnyLoginId) {
            if (silent)
                return;
            this.requireAnyLoginId(inputData);
        }
        const dbs = this.getRegisteredService(DatabaseSchema);
        const userRep = dbs.getRepository(UserModel.name);
        const user = await userRep.findOne({ where, include });
        if (!user) {
            debug('User not found.');
            if (silent)
                return;
            throw createError(HttpErrors.BadRequest, 'USER_NOT_FOUND', localizer.t(`${errorKeyPrefix}.loginFailedError`));
        }
        debug('User found with id %v.', user.id);
        return user;
    }
    /**
     * Validate login id.
     *
     * @param idName
     * @param idValue
     * @param ownerId
     */
    async validateLoginId(idName, idValue, ownerId) {
        const debug = this.getDebuggerFor(this.validateLoginId);
        debug('Validating login identifier in the user data input.');
        const localizer = this.getLocalizer();
        const titledIdName = idName.charAt(0).toUpperCase() + idName.slice(1);
        const errorKeyPrefix = 'authService.validateLoginId';
        debug('Given id name was %v.', idName);
        debug('Given id value was %v.', idValue);
        if (idValue) {
            // проверка формата при наличии значения
            const validator = this.options[`${idName}FormatValidator`];
            validator(idValue, localizer);
            debug('Value format validated.');
            // если найден дубликат идентификатора другого
            // пользователя, то выбрасывается ошибка
            debug('Checking identifier duplicates.');
            const duplicate = await this.findUserByLoginIds({ [idName]: idValue }, undefined, true);
            if (duplicate && duplicate.id !== ownerId) {
                const errorKey = `${errorKeyPrefix}.duplicate${titledIdName}Error`;
                throw createError(HttpErrors.BadRequest, 'DUPLICATE_LOGIN_IDENTIFIER', localizer.t(errorKey));
            }
            debug('No duplicates found.');
        }
        debug('Identifier validated.');
    }
    /**
     * Require any login id.
     *
     * @param inputData
     */
    requireAnyLoginId(data) {
        const debug = this.getDebuggerFor(this.createUser);
        debug('Require any login identifier.');
        const localizer = this.getLocalizer();
        const errorKeyPrefix = 'authService.requireAnyLoginId';
        // если ни один идентификатор не определен,
        // то выбрасывается ошибка
        if (LOGIN_ID_NAMES.every(idName => !data[idName])) {
            debug('No login identifier was given.');
            const idFields = LOGIN_ID_NAMES.filter(id => id in data);
            const singleIdField = idFields.length === 1 ? idFields[0] : undefined;
            if (singleIdField && data[singleIdField] === '')
                throw createError(HttpErrors.BadRequest, singleIdField.toUpperCase() + '_REQUIRED', localizer.t(`${errorKeyPrefix}.${singleIdField}RequiredError`));
            throw createError(HttpErrors.BadRequest, 'LOGIN_IDENTIFIER_REQUIRED', localizer.t(`${errorKeyPrefix}.identifierRequiredError`));
        }
    }
    /**
     * Create user.
     *
     * @param ctx
     * @param data
     * @param include
     */
    async createUser(inputData, include) {
        const debug = this.getDebuggerFor(this.createUser);
        debug('Creating user.');
        const localizer = this.getLocalizer();
        inputData = JSON.parse(JSON.stringify(inputData));
        // обрезка пробелов в идентификаторах
        LOGIN_ID_NAMES.forEach(idName => {
            if (typeof inputData[idName] === 'string')
                inputData[idName] = inputData[idName].trim();
        });
        // проверка формата идентификаторов и отсутствия дубликатов
        for (const idName of LOGIN_ID_NAMES) {
            await this.validateLoginId(idName, inputData[idName]);
        }
        // хэширование пароля
        if (inputData.password) {
            this.options.passwordFormatValidator(inputData.password, localizer);
            inputData.password = await this.hashPassword(inputData.password || '');
            debug('Password hashed.');
        }
        // переопределение даты создания
        inputData.createdAt = new Date().toISOString();
        // создание пользователя
        const dbs = this.getRegisteredService(DatabaseSchema);
        const userRep = dbs.getRepository(UserModel.name);
        const res = await userRep.create(inputData, { include });
        debug('User created.');
        debug('User id was %v.', res.id);
        return res;
    }
    /**
     * Update user.
     *
     * @param ctx
     * @param userId
     * @param data
     * @param include
     */
    async updateUser(userId, inputData, include) {
        const debug = this.getDebuggerFor(this.updateUser);
        debug('Updating user.');
        debug('User id was %v.', userId);
        inputData = JSON.parse(JSON.stringify(inputData));
        const localizer = this.getLocalizer();
        const errorKeyPrefix = 'authService.updateUser';
        const dbs = this.getRegisteredService(DatabaseSchema);
        const userRep = dbs.getRepository(UserModel.name);
        const existingUser = await userRep.findOne({ where: { id: userId } });
        if (!existingUser)
            throw createError(HttpErrors.BadRequest, 'USER_NOT_FOUND', localizer.t(`${errorKeyPrefix}.userNotFoundError`));
        // обрезка пробелов в идентификаторах
        LOGIN_ID_NAMES.forEach(idName => {
            if (typeof inputData[idName] === 'string')
                inputData[idName] = inputData[idName].trim();
        });
        // проверка формата идентификаторов и отсутствия дубликатов
        for (const idName of LOGIN_ID_NAMES) {
            await this.validateLoginId(idName, inputData[idName], existingUser.id);
        }
        // удаление ключей идентификаторов содержащих null и undefined
        LOGIN_ID_NAMES.forEach(idName => {
            if (inputData[idName] == null)
                delete inputData[idName];
        });
        // хэширование пароля (при наличии)
        if (inputData.password) {
            this.options.passwordFormatValidator(inputData.password, localizer);
            inputData.password = await this.hashPassword(inputData.password || '');
            debug('Password hashed.');
        }
        // удаление даты создания
        // и формирование даты обновления
        delete inputData.createdAt;
        inputData.updatedAt = new Date().toISOString();
        // обновление документа
        const res = await userRep.patchById(userId, inputData, { include });
        debug('User updated.');
        return res;
    }
    /**
     * Find access token by request context.
     *
     * @param ctx
     * @param include
     */
    async findAccessTokenByRequestContext(ctx, include) {
        const debug = this.getDebuggerFor(this.findAccessTokenByRequestContext);
        debug('Finding access token by request context.');
        const jwToken = ctx.headers[this.options.jwtHeaderName] ||
            ctx.cookies[this.options.jwtCookieName] ||
            ctx.query[this.options.jwtQueryParam];
        if (!jwToken) {
            debug('JWT not found.');
            return;
        }
        const payload = await this.decodeJwt(jwToken);
        const accessToken = await this.findAccessTokenById(payload.tid, include);
        if (accessToken.ownerId !== payload.uid)
            throw createError(HttpErrors.BadRequest, 'INVALID_ACCESS_TOKEN_OWNER', 'Your access token not match its owner', payload);
        debug('Access token found.');
        debug('Token id was %v.', accessToken.id);
        debug('Owner id was %v.', accessToken.ownerId);
        return accessToken;
    }
    /**
     * Find access token owner.
     *
     * @param accessToken
     */
    async findAccessTokenOwner(accessToken, include) {
        const debug = this.getDebuggerFor(this.findAccessTokenOwner);
        debug('Finding access token owner.');
        if (!accessToken.ownerId)
            throw createError(HttpErrors.BadRequest, 'NO_ACCESS_TOKEN_OWNER', 'Your access token does not have an owner', accessToken);
        const dbs = this.getRegisteredService(DatabaseSchema);
        const rep = dbs.getRepository(UserModel.name);
        const owner = await rep.findOne({
            where: { id: accessToken.ownerId },
            include,
        });
        if (!owner)
            throw createError(HttpErrors.BadRequest, 'NO_ACCESS_TOKEN_OWNER', 'Your access token does not have an owner', accessToken);
        debug('Owner found with id %v.', owner.id);
        return owner;
    }
    /**
     * Create auth session.
     *
     * @param ctx
     */
    async createAuthSession(ctx) {
        const accessToken = await this.findAccessTokenByRequestContext(ctx);
        if (accessToken) {
            const user = await this.findAccessTokenOwner(accessToken, this.options.sessionUserInclusion);
            return new AuthSession(ctx.container, accessToken, user);
        }
        else {
            return new AuthSession(ctx.container);
        }
    }
}

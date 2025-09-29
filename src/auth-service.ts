import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v7 as uuidV7} from 'uuid';
import HttpErrors from 'http-errors';
import {RoleModel} from './models/index.js';
import {UserModel} from './models/index.js';
import {createError} from './utils/index.js';
import {UserSession} from './user-session.js';
import {Localizer} from '@e22m4u/js-localizer';
import {BaseRoleModel} from './models/index.js';
import {BaseUserModel} from './models/index.js';
import {WithoutId} from '@e22m4u/js-repository';
import {removeEmptyKeys} from './utils/index.js';
import {authLocalizer, AuthLocalizer} from './auth-localizer.js';
import {WhereClause} from '@e22m4u/js-repository';
import {TrieRouter} from '@e22m4u/js-trie-router';
import {AccessTokenModel} from './models/index.js';
import {IncludeClause} from '@e22m4u/js-repository';
import {ServiceContainer} from '@e22m4u/js-service';
import {DatabaseSchema} from '@e22m4u/js-repository';
import {RequestContext} from '@e22m4u/js-trie-router';
import {BaseAccessTokenModel} from './models/index.js';
import {DefinitionRegistry} from '@e22m4u/js-repository';
import {DebuggableService} from './debuggable-service.js';
import {emailFormatValidator} from './validators/index.js';
import {phoneFormatValidator} from './validators/index.js';
import {passwordFormatValidator} from './validators/index.js';
import {usernameFormatValidator} from './validators/index.js';
import {getModelDefinitionFromClass} from '@e22m4u/js-repository-decorators';

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
 * Register models options.
 */
type RegisterModelsOptions = {
  datasource?: string;
};

/**
 * User login identifiers.
 */
const USER_LOGIN_IDENTIFIERS = ['username', 'email', 'phone'] as const;

/**
 * User login identifier.
 */
type UserLoginIdentifier = (typeof USER_LOGIN_IDENTIFIERS)[number];

/**
 * Data format validator.
 */
export type DataFormatValidator = (
  value: unknown,
  localizer: Localizer,
) => void;

/**
 * Auth service options.
 */
export type AuthServiceOptions = {
  requireUsername: boolean;
  requireEmail: boolean;
  requirePhone: boolean;
  requirePassword: boolean;
  passwordHashRounds: number;
  usernameFormatValidator: DataFormatValidator;
  emailFormatValidator: DataFormatValidator;
  phoneFormatValidator: DataFormatValidator;
  passwordFormatValidator: DataFormatValidator;
  jwtSecret: string;
  jwtTtl: number;
  jwtHeaderName: string;
  jwtCookieName: string;
  jwtQueryParam: string;
};

/**
 * Default auth options.
 */
export const DEFAULT_AUTH_OPTIONS: AuthServiceOptions = {
  requireUsername: false,
  requireEmail: false,
  requirePhone: false,
  requirePassword: true,
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
};

/**
 * User lookup.
 */
export type UserLookup = {
  [K in UserLoginIdentifier]?: string;
};

/**
 * User lookup with password.
 */
export type UserLookupWithPassword = UserLookup & {
  password?: string;
};

/**
 * Pre handler hook.
 *
 * @param ctx
 */
async function preHandlerHook(ctx: RequestContext) {
  // инъекция экземпляра переводчика
  const localizer = authLocalizer.cloneWithLocaleFromRequest(ctx.req);
  ctx.container.set(AuthLocalizer, localizer);
  // инъекция пользовательской сессии
  const authService = ctx.container.get(AuthService);
  const user = await authService.findUserByRequestContext(ctx);
  const userSession = new UserSession(user);
  ctx.container.set(UserSession, userSession);
}

/**
 * Auth service.
 */
export class AuthService extends DebuggableService {
  /**
   * Options.
   */
  readonly options = JSON.parse(JSON.stringify(DEFAULT_AUTH_OPTIONS));

  /**
   * Constructor.
   *
   * @param container
   * @param options
   */
  constructor(
    container?: ServiceContainer,
    options?: Partial<AuthServiceOptions>,
  ) {
    super(container);
    if (options) {
      const filteredOptions = removeEmptyKeys(options);
      this.options = Object.assign(this.options, filteredOptions);
    }
  }
  /**
   * Register models.
   */
  registerModels(options?: RegisterModelsOptions) {
    const debug = this.getDebuggerFor(this.registerModels);
    debug('Registering models.');
    const dbs = this.getRegisteredService(DatabaseSchema);
    const defReg = dbs.getService(DefinitionRegistry);
    AUTH_MODEL_LIST.forEach(modelCtor => {
      if (defReg.hasModel(modelCtor.name)) {
        debug(
          '%s is skipped because it is already registered.',
          modelCtor.name,
        );
      } else {
        const modelDef = getModelDefinitionFromClass(modelCtor);
        dbs.defineModel({
          ...modelDef,
          datasource: options?.datasource,
        });
        debug('%s is registered.', modelCtor.name);
      }
    });
    debug('Model registration is done.');
  }

  /**
   * Register hooks.
   */
  registerRequestHooks() {
    const debug = this.getDebuggerFor(this.registerRequestHooks);
    debug('Registering hooks.');
    this.getRegisteredService(TrieRouter).addHook('preHandler', preHandlerHook);
    debug('Hooks registration is done.');
  }

  /**
   * Create access token.
   *
   * @param user
   * @param patch
   */
  async createAccessToken<T extends BaseAccessTokenModel>(
    user: BaseUserModel,
    patch?: Partial<T>,
  ): Promise<T> {
    const debug = this.getDebuggerFor(this.createAccessToken);
    debug('Creating access token.');
    if (!user.id) {
      throw new Error('User ID is not defined.');
    }
    const data: BaseAccessTokenModel = {
      id: uuidV7(),
      ownerId: user.id,
      createdAt: new Date().toISOString(),
      ...patch,
    };
    debug('Token ID is %v.', data.id);
    debug('Token owner is %v.', user.id);
    const dbs = this.getRegisteredService(DatabaseSchema);
    const rep = dbs.getRepository<BaseAccessTokenModel>(AccessTokenModel.name);
    const res = (await rep.create(data)) as T;
    debug('Access token saved.');
    return res;
  }

  /**
   * Remove access token.
   *
   * @param tokenId
   */
  async removeAccessToken(
    accessTokenId: AccessTokenModel['id'],
  ): Promise<boolean> {
    const debug = this.getDebuggerFor(this.removeAccessToken);
    debug('Remove access token.');
    debug('Token ID is %v.', accessTokenId);
    const dbs = this.getRegisteredService(DatabaseSchema);
    const rep = dbs.getRepository<BaseAccessTokenModel>(AccessTokenModel.name);
    const res = await rep.deleteById(accessTokenId);
    if (res) {
      debug('Access token removed.');
    } else {
      debug('Access token does not exist.');
    }
    return res;
  }

  /**
   * Access Token to JSON Web Token.
   *
   * @param accessToken
   */
  accessTokenToJwt(
    accessToken: BaseAccessTokenModel,
  ): Promise<{token: string; expiresAt: number}> {
    const debug = this.getDebuggerFor(this.accessTokenToJwt);
    debug('Converting access token to JWT.');
    const payload = {uid: accessToken.ownerId, tid: accessToken.id};
    const expiresAt = Math.floor(Date.now() / 1000) + this.options.jwtTtl;
    return new Promise((res, rej) => {
      jwt.sign(
        payload,
        this.options.jwtSecret,
        {algorithm: 'HS256', expiresIn: this.options.jwtTtl},
        (err: unknown, token: string | undefined) => {
          if (err || !token) {
            console.error(err);
            return rej(
              createError(
                HttpErrors.InternalServerError,
                'JWT_ENCODING_FAILED',
                'Unable to encode JSON web token',
                payload,
              ),
            );
          }
          res({token, expiresAt});
        },
      );
    });
  }

  /**
   * Verify JWT and find Access Token.
   *
   * @param jwToken
   * @param localizer
   * @param include
   */
  async verifyJwtAndFindItsOwner<T extends BaseUserModel>(
    jwToken: string,
    localizer: Localizer,
    include?: IncludeClause,
  ): Promise<T> {
    const debug = this.getDebuggerFor(this.verifyJwtAndFindItsOwner);
    const errorKeyPrefix = 'authorizationService.verifyJwtAndFindItsOwner';
    debug('Verifying JWT and find its owner.');
    let error: unknown;
    let payload: unknown;
    try {
      payload = await new Promise((res, rej) => {
        jwt.verify(
          jwToken,
          this.options.jwtSecret,
          (err: unknown, decoded: unknown) => {
            if (err) return rej(err);
            res(decoded);
          },
        );
      });
    } catch (err) {
      error = err;
    }
    if (
      error ||
      !payload ||
      typeof payload !== 'object' ||
      !('uid' in payload) ||
      !('tid' in payload) ||
      !payload.uid ||
      !payload.tid
    ) {
      console.log(error);
      throw createError(
        HttpErrors.InternalServerError,
        'JWT_VERIFYING_FAILED',
        'Unable to verify JSON web token',
        payload,
      );
    }
    const dbs = this.getRegisteredService(DatabaseSchema);
    const rep = dbs.getRepository<BaseAccessTokenModel>(AccessTokenModel.name);
    const accessToken = await rep.findOne({
      where: {id: payload.tid},
      include: include ? {owner: include} : undefined,
    });
    if (!accessToken || accessToken.ownerId !== payload.uid)
      throw createError(
        HttpErrors.InternalServerError,
        'JWT_VERIFYING_FAILED',
        'Unable to verify JSON web token',
        payload,
      );
    debug('Access token has been found.');
    debug('Token ID is %v.', accessToken.id);
    if (!accessToken.ownerId || !accessToken.owner)
      throw createError(
        HttpErrors.Unauthorized,
        'ACCESS_TOKEN_OWNER_NOT_FOUND',
        localizer.t(`${errorKeyPrefix}.ownerNotFound`),
        {accessTokenId: accessToken.id},
      );
    debug('Token owner is %v.', accessToken.ownerId);
    return accessToken.owner as T;
  }

  /**
   * Hash password.
   *
   * @param password
   */
  async hashPassword(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, this.options.passwordHashRounds);
    } catch (error) {
      console.error(error);
      throw createError(
        HttpErrors.InternalServerError,
        'HASH_PASSWORD_FAILED',
        'Unable to hash the given password',
      );
    }
  }

  /**
   * Verify password.
   *
   * @param password
   * @param hash
   */
  async verifyPassword(password: string, hash: string): Promise<boolean> {
    try {
      return bcrypt.compare(password, hash);
    } catch (error) {
      console.error(error);
      throw createError(
        HttpErrors.InternalServerError,
        'PASSWORD_VERIFYING_ERROR',
        'Unable to verify the given password',
      );
    }
  }

  /**
   * Find user.
   *
   * @param lookup
   * @param include
   */
  async findUser<T extends BaseUserModel>(
    lookup: UserLookup,
    include?: IncludeClause,
  ): Promise<T | undefined> {
    if (!lookup.username && !lookup.email && !lookup.phone) return;
    const where: WhereClause = {};
    if (lookup.username) where.username = lookup.username.toLowerCase();
    if (lookup.email) where.email = lookup.email.toLowerCase();
    if (lookup.phone) where.phone = lookup.phone.toLowerCase();
    const dbs = this.getRegisteredService(DatabaseSchema);
    const userRep = dbs.getRepository(UserModel.name);
    const res = await userRep.findOne({where, include});
    return res as T | undefined;
  }

  /**
   * Is attempting to remove last identifier.
   *
   * @param idName
   * @param data
   * @param updatingUser
   */
  protected isAttemptingToRemoveLastIdentifier(
    idName: UserLoginIdentifier,
    data: Partial<BaseUserModel>,
    updatingUser: BaseUserModel,
  ): boolean {
    if (data[idName] !== '') return false;
    const otherIdentifiers = USER_LOGIN_IDENTIFIERS.filter(id => id !== idName);
    const isProvidingNewIdentifier = otherIdentifiers.some(id => data[id]);
    if (isProvidingNewIdentifier) return false;
    const hasOtherExistingIdentifiers = otherIdentifiers.some(
      id => updatingUser[id],
    );
    return !hasOtherExistingIdentifiers;
  }

  /**
   * Validate user identifier.
   *
   * @param idName
   * @param data
   * @param localizer
   * @param existingUser
   */
  protected async validateUserIdentifier(
    idName: UserLoginIdentifier,
    data: Partial<BaseUserModel>,
    localizer: Localizer,
    existingUser?: BaseUserModel,
  ): Promise<void> {
    const titledIdName = idName.charAt(0).toUpperCase() + idName.slice(1);
    const errorKeyPrefix = 'authorizationService.validateUserIdentifier';
    const value = data[idName];
    // если определен существующий пользователь, то данные будут
    // использованы для обновления методом PATCH, а значит проверка
    // значений null и undefined не требуется
    if (existingUser && value == null) return;
    // если получено пустое значение, но идентификатор
    // является обязательным, то выбрасывается ошибка
    const isRequired = this.options[`require${titledIdName}`];
    if (isRequired && !value)
      throw createError(
        HttpErrors.BadRequest,
        'LOGIN_IDENTIFIER_REQUIRED',
        localizer.t(`${errorKeyPrefix}.${idName}RequiredError`),
      );
    // проверка формата
    const validator = this.options[`${idName}FormatValidator`];
    validator(value, localizer);
    // если найден дубликат идентификатора другого
    // пользователя, то выбрасывается ошибка
    const duplicate = await this.findUser({[idName]: value});
    if (duplicate && duplicate.id !== existingUser?.id) {
      const errorKey = `${errorKeyPrefix}.duplicate${titledIdName}Error`;
      throw createError(
        HttpErrors.BadRequest,
        'DUPLICATE_USER_IDENTIFIER',
        localizer.t(errorKey),
      );
    }
    // если выполняется попытка удаления последнего
    // идентификатора, то выбрасывается ошибка
    if (
      existingUser &&
      this.isAttemptingToRemoveLastIdentifier(idName, data, existingUser)
    ) {
      throw createError(
        HttpErrors.BadRequest,
        'LOGIN_IDENTIFIER_REQUIRED',
        localizer.t(`${errorKeyPrefix}.${idName}RequiredError`),
      );
    }
  }

  /**
   * Register user.
   *
   * @param ctx
   * @param data
   * @param include
   */
  async createUser<T extends BaseUserModel, V extends WithoutId<'id', T>>(
    ctx: RequestContext,
    data: V,
    include?: IncludeClause,
  ): Promise<T> {
    data = JSON.parse(JSON.stringify(data));
    const debug = this.getDebuggerFor(this.createUser);
    const localizer = ctx.container.getRegistered(Localizer);
    debug('Creating user.');
    // обрезка пробелов
    USER_LOGIN_IDENTIFIERS.forEach(loginId => {
      if (typeof data[loginId] === 'string')
        data[loginId] = data[loginId].trim();
    });
    // проверка формата идентификаторов и отсутствия дубликатов
    const validationPromises: Promise<void>[] = [];
    USER_LOGIN_IDENTIFIERS.forEach(loginId => {
      validationPromises.push(
        this.validateUserIdentifier(loginId, data, localizer),
      );
    });
    await Promise.all(validationPromises);
    // если ни один идентификатор не определен,
    // то выбрасывается ошибка
    if (USER_LOGIN_IDENTIFIERS.every(id => !data[id]))
      throw createError(
        HttpErrors.BadRequest,
        'LOGIN_IDENTIFIER_REQUIRED',
        localizer.t('authorizationService.createUser.identifierRequiredError'),
      );
    // хэширование пароля
    if (this.options.requirePassword || data.password) {
      this.options.passwordFormatValidator(data.password, localizer);
      data.password = await this.hashPassword(data.password || '');
      debug('Password hashed.');
    }
    // переопределение даты создания
    data.createdAt = new Date().toISOString();
    // создание пользователя
    const dbs = this.getRegisteredService(DatabaseSchema);
    const userRep = dbs.getRepository<BaseUserModel>(UserModel.name);
    const res = await userRep.create(data, {include});
    debug('User created %v.', res.id);
    return res as T;
  }

  /**
   * Update user.
   *
   * @param ctx
   * @param userId
   * @param data
   * @param include
   */
  async updateUser<T extends BaseUserModel>(
    ctx: RequestContext,
    userId: T['id'],
    data: Partial<T>,
    include?: IncludeClause,
  ): Promise<T> {
    data = JSON.parse(JSON.stringify(data));
    const debug = this.getDebuggerFor(this.updateUser);
    const localizer = ctx.container.getRegistered(Localizer);
    debug('Updating user.');
    debug('User ID is %v.', userId);
    const dbs = this.getRegisteredService(DatabaseSchema);
    const userRep = dbs.getRepository<BaseUserModel>(UserModel.name);
    const user = await userRep.findById(userId);
    // обрезка пробелов
    USER_LOGIN_IDENTIFIERS.forEach(loginId => {
      if (typeof data[loginId] === 'string')
        data[loginId] = data[loginId].trim();
    });
    // проверка формата идентификаторов и отсутствия дубликатов
    const validationPromises: Promise<void>[] = [];
    USER_LOGIN_IDENTIFIERS.forEach(loginId => {
      validationPromises.push(
        this.validateUserIdentifier(loginId, data, localizer, user),
      );
    });
    await Promise.all(validationPromises);
    // удаление ключей для идентификаторов содержащих null и undefined
    USER_LOGIN_IDENTIFIERS.forEach(loginId => {
      if (data[loginId] == null) delete data[loginId];
    });
    // если все идентификаторы переданы со значением
    // пустой строки, то выбрасывается ошибка
    if (USER_LOGIN_IDENTIFIERS.every(loginId => data[loginId] === '')) {
      throw createError(
        HttpErrors.BadRequest,
        'LOGIN_IDENTIFIER_REQUIRED',
        localizer.t('authorizationService.updateUser.identifierRequiredError'),
      );
    }
    // хэширование пароля (при наличии)
    if (data.password != null) {
      this.options.passwordFormatValidator(data.password, localizer);
      data.password = await this.hashPassword(data.password || '');
      debug('Password hashed.');
    }
    // удаление даты создания и определение
    // даты обновления
    delete data.createdAt;
    data.updatedAt = new Date().toISOString();
    // обновление документа
    const res = await userRep.patchById(userId, data, {include});
    debug('User updated.');
    return res as T;
  }

  /**
   * Find user and validate password.
   *
   * @param ctx
   * @param lookup
   * @param include
   */
  async findUserAndValidatePassword<T extends BaseUserModel>(
    ctx: RequestContext,
    lookup: UserLookupWithPassword,
    include?: IncludeClause,
  ): Promise<T> {
    const debug = this.getDebuggerFor(this.findUserAndValidatePassword);
    const localizer = ctx.container.getRegistered(Localizer);
    const errorKeyPrefix = 'authorizationService.findUserAndValidatePassword';
    debug('Finding user and validating password.');
    const debugCtx = JSON.parse(JSON.stringify(lookup));
    delete debugCtx.password;
    debug.inspect('Input:', debugCtx);
    // проверка наличия идентификатора
    if (!lookup.username && !lookup.email && !lookup.phone) {
      const idFields = USER_LOGIN_IDENTIFIERS.filter(id => id in lookup);
      const singleIdField = idFields.length === 1 ? idFields[0] : undefined;
      if (singleIdField && lookup[singleIdField] === '')
        throw createError(
          HttpErrors.BadRequest,
          'LOGIN_IDENTIFIER_REQUIRED',
          localizer.t(`${errorKeyPrefix}.${singleIdField}RequiredError`),
          debugCtx,
        );
      throw createError(
        HttpErrors.BadRequest,
        'LOGIN_IDENTIFIER_REQUIRED',
        localizer.t(`${errorKeyPrefix}.identifierRequiredError`),
        debugCtx,
      );
    }
    // поиск пользователя
    const user = await this.findUser<T>(lookup, include);
    if (!user)
      throw createError(
        HttpErrors.BadRequest,
        'USER_NOT_FOUND',
        localizer.t(`${errorKeyPrefix}.loginFailedError`),
        debugCtx,
      );
    // проверка пароля
    const isPasswordValid = await this.verifyPassword(
      lookup.password || '',
      user.password || '',
    );
    if (!isPasswordValid)
      throw createError(
        HttpErrors.BadRequest,
        'INVALID_PASSWORD',
        localizer.t(`${errorKeyPrefix}.loginFailedError`),
        debugCtx,
      );
    return user;
  }

  /**
   * Find user by request context.
   *
   * @param ctx
   * @param include
   */
  async findUserByRequestContext<T extends BaseUserModel>(
    ctx: RequestContext,
    include?: IncludeClause,
  ): Promise<T | undefined> {
    const debug = this.getDebuggerFor(this.findUserByRequestContext);
    const localizer = ctx.container.getRegistered(Localizer);
    debug('Finding user by request context.');
    const jwToken =
      ctx.headers[this.options.jwtHeaderName] ||
      ctx.cookie[this.options.jwtCookieName] ||
      ctx.query[this.options.jwtQueryParam];
    if (!jwToken) {
      debug('Token does not exist in the request context.');
      return;
    }
    return await this.verifyJwtAndFindItsOwner<T>(jwToken, localizer, include);
  }

  /**
   * Issue JSON Web Token for User.
   *
   * @param user
   * @param patch
   */
  async issueJwtForUser(
    user: BaseUserModel,
    patch: object,
  ): Promise<{token: string; expiresAt: number}> {
    const accessToken = await this.createAccessToken(user, patch);
    return this.accessTokenToJwt(accessToken);
  }
}

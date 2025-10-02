import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v7 as uuidV7} from 'uuid';
import HttpErrors from 'http-errors';
import {RoleModel} from './models/index.js';
import {UserModel} from './models/index.js';
import {createError} from './utils/index.js';
import {AuthSession} from './auth-session.js';
import {Localizer} from '@e22m4u/js-localizer';
import {BaseRoleModel} from './models/index.js';
import {BaseUserModel} from './models/index.js';
import {WithoutId} from '@e22m4u/js-repository';
import {removeEmptyKeys} from './utils/index.js';
import {authLocalizer} from './auth-localizer.js';
import {AuthLocalizer} from './auth-localizer.js';
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
 * Login id names.
 */
export const LOGIN_ID_NAMES = ['username', 'email', 'phone'] as const;

/**
 * Login id.
 */
export type LoginIdName = (typeof LOGIN_ID_NAMES)[number];

/**
 * Lower case login id names.
 */
export const LOWER_CASE_LOGIN_ID_NAMES: LoginIdName[] = [
  'username',
  'email',
  'phone',
];

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
  sessionUserInclusion: IncludeClause;
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
  sessionUserInclusion: 'roles',
};

/**
 * Login ids filter.
 */
export type LoginIdsFilter = {
  [K in LoginIdName]?: string;
};

/**
 * User lookup with password.
 */
export type UserLookupWithPassword = LoginIdsFilter & {
  password?: string;
};

/**
 * Jwt payload.
 */
export type JwtPayload = {
  tid: string;
  uid: string;
};

/**
 * Jwt issue result.
 */
export type JwtIssueResult = {
  token: string;
  expiresAt: string;
};

/**
 * Pre handler hook.
 *
 * @param ctx
 */
async function preHandlerHook(ctx: RequestContext) {
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
  /**
   * Options.
   */
  readonly options: AuthServiceOptions = Object.assign(
    {},
    DEFAULT_AUTH_OPTIONS,
  );

  /**
   * Constructor.
   *
   * @param container
   * @param options
   */
  constructor(
    container?: ServiceContainer,
    options?: Partial<AuthServiceOptions>,
    readonly requestContext?: RequestContext,
  ) {
    super(container);
    if (options) {
      const filteredOptions = removeEmptyKeys(options);
      this.options = Object.assign(this.options, filteredOptions);
    }
    if (
      process.env.NODE_ENV === 'production' &&
      this.options.jwtSecret === 'REPLACE_ME!'
    ) {
      throw new Error('JWT secret is not set for the production environment!');
    }
  }

  /**
   * Get localizer
   */
  getLocalizer() {
    if (
      !this.requestContext ||
      !this.requestContext.container.has(AuthLocalizer)
    ) {
      return authLocalizer;
    }
    return this.requestContext.container.getRegistered(AuthLocalizer);
  }

  /**
   * Clone with request context.
   *
   * @param ctx
   */
  cloneWithRequestContext(ctx: RequestContext) {
    return new AuthService(this.container, this.options, ctx);
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
        debug('%s skipped, already registered.', modelCtor.name);
      } else {
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
  async createAccessToken<T extends BaseAccessTokenModel>(
    ownerId: string | number,
    patch?: Partial<T>,
  ): Promise<T> {
    const debug = this.getDebuggerFor(this.createAccessToken);
    debug('Creating access token.');
    debug('Owner id was %v.', ownerId);
    const data: BaseAccessTokenModel = {
      id: uuidV7(),
      ownerId,
      createdAt: new Date().toISOString(),
      ...patch,
    };
    const dbs = this.getRegisteredService(DatabaseSchema);
    const rep = dbs.getRepository<BaseAccessTokenModel>(AccessTokenModel.name);
    const res = (await rep.create(data)) as T;
    debug('Access token created and saved to database.');
    return res;
  }

  /**
   * Remove access token by id.
   *
   * @param tokenId
   */
  async removeAccessTokenById(
    accessTokenId: AccessTokenModel['id'],
  ): Promise<boolean> {
    const debug = this.getDebuggerFor(this.removeAccessTokenById);
    debug('Removing access token by id.');
    debug('Token id was %v.', accessTokenId);
    const dbs = this.getRegisteredService(DatabaseSchema);
    const rep = dbs.getRepository<BaseAccessTokenModel>(AccessTokenModel.name);
    const res = await rep.deleteById(accessTokenId);
    if (res) {
      debug('Access token removed from database.');
    } else {
      debug('Access token not found.');
    }
    return res;
  }

  /**
   * Issue JSON Web Token.
   *
   * @param accessToken
   */
  issueJwt(accessToken: BaseAccessTokenModel): Promise<JwtIssueResult> {
    const debug = this.getDebuggerFor(this.issueJwt);
    debug('Issuing JWT.');
    debug('Token id was %v.', accessToken.id);
    debug('Owner id was %v.', accessToken.ownerId);
    const payload = {uid: accessToken.ownerId, tid: accessToken.id};
    const expiresAtInSec = Math.floor(Date.now() / 1000) + this.options.jwtTtl;
    const expiresAt = new Date(expiresAtInSec * 1000).toISOString();
    debug('Expiration date was %v.', expiresAt);
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
                'TOKEN_ENCODING_FAILED',
                'Unable to encode JSON web token',
                payload,
              ),
            );
          }
          debug('Token was %v.', token);
          debug('Token created.');
          res({token, expiresAt});
        },
      );
    });
  }

  /**
   * Decode Jwt.
   *
   * @param jwToken
   */
  async decodeJwt(jwToken: string): Promise<JwtPayload> {
    const debug = this.getDebuggerFor(this.decodeJwt);
    debug('Decoding JWT.');
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
      console.error(error);
      throw createError(
        HttpErrors.InternalServerError,
        'TOKEN_VERIFYING_FAILED',
        'Unable to verify JSON web token',
        {token: jwToken, payload},
      );
    }
    debug.inspect('Payload:', payload);
    debug('Token decoded successfully.');
    return payload as JwtPayload;
  }

  /**
   * Find access token by id.
   *
   * @param jwToken
   * @param include
   */
  async findAccessTokenById<T extends BaseAccessTokenModel>(
    tokenId: string,
    include?: IncludeClause,
  ): Promise<T> {
    const debug = this.getDebuggerFor(this.findAccessTokenById);
    debug('Finding access token by id.');
    debug('Token id was %v.', tokenId);
    const dbs = this.getRegisteredService(DatabaseSchema);
    const rep = dbs.getRepository<BaseAccessTokenModel>(AccessTokenModel.name);
    const accessToken = await rep.findOne({where: {id: tokenId}, include});
    if (!accessToken)
      throw createError(
        HttpErrors.InternalServerError,
        'ACCESS_TOKEN_NOT_FOUND',
        'Access token is not found in the database',
        {tokenId},
      );
    debug('Owner id was %v.', accessToken.ownerId);
    if (!accessToken.ownerId)
      throw createError(
        HttpErrors.Unauthorized,
        'ACCESS_TOKEN_OWNER_NOT_FOUND',
        'Access token has no owner',
        {tokenId},
      );
    debug('Access token found.');
    return accessToken as T;
  }

  /**
   * Hash password.
   *
   * @param password
   */
  async hashPassword(password: string): Promise<string> {
    if (!password) return '';
    try {
      return bcrypt.hash(password, this.options.passwordHashRounds);
    } catch (error) {
      console.error(error);
      throw createError(
        HttpErrors.InternalServerError,
        'PASSWORD_HASHING_ERROR',
        'Unable to hash the given password',
      );
    }
  }

  /**
   * Verify password.
   *
   * @param password
   * @param hash
   * @param silent
   */
  async verifyPassword(password: string, hash: string): Promise<true>;

  /**
   * Verify password.
   *
   * @param password
   * @param hash
   * @param silent
   */
  async verifyPassword(
    password: string,
    hash: string,
    silent: false,
  ): Promise<true>;

  /**
   * Verify password.
   *
   * @param password
   * @param hash
   * @param silent
   */
  async verifyPassword(
    password: string,
    hash: string,
    silent: true,
  ): Promise<boolean>;

  /**
   * Verify password.
   *
   * @param password
   * @param hash
   * @param silent
   */
  async verifyPassword(
    password: string,
    hash: string,
    silent?: boolean,
  ): Promise<boolean>;

  /**
   * Verify password.
   *
   * @param password
   * @param hash
   * @param silent
   */
  async verifyPassword(
    password: string,
    hash: string,
    silent = false,
  ): Promise<boolean> {
    const debug = this.getDebuggerFor(this.verifyPassword);
    const localizer = this.getLocalizer();
    const errorKeyPrefix = 'authService.verifyPassword';
    debug('Verifying password');
    let isValid = false;
    try {
      isValid = await bcrypt.compare(password, hash);
    } catch (error) {
      console.error(error);
      throw createError(
        HttpErrors.InternalServerError,
        'PASSWORD_VERIFYING_ERROR',
        'Unable to verify the given password',
      );
    }
    if (!isValid) {
      if (silent) return false;
      throw createError(
        HttpErrors.BadRequest,
        'PASSWORD_VERIFYING_ERROR',
        localizer.t(`${errorKeyPrefix}.invalidPasswordError`),
      );
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
  async findUserByLoginIds<T extends BaseUserModel>(
    lookup: LoginIdsFilter,
    include: IncludeClause | undefined,
  ): Promise<T>;

  /**
   * Find user by login ids.
   *
   * @param lookup
   * @param include
   * @param silent
   */
  async findUserByLoginIds<T extends BaseUserModel>(
    lookup: LoginIdsFilter,
    include: IncludeClause | undefined,
    silent: false,
  ): Promise<T>;

  /**
   * Find user by login ids.
   *
   * @param lookup
   * @param include
   * @param silent
   */
  async findUserByLoginIds<T extends BaseUserModel>(
    lookup: LoginIdsFilter,
    include: IncludeClause | undefined,
    silent: true,
  ): Promise<T | undefined>;

  /**
   * Find user by login ids.
   *
   * @param lookup
   * @param include
   * @param silent
   */
  async findUserByLoginIds<T extends BaseUserModel>(
    lookup: LoginIdsFilter,
    include?: IncludeClause,
    silent?: boolean,
  ): Promise<T | undefined>;

  /**
   * Find user by login ids.
   *
   * @param lookup
   * @param include
   * @param silent
   */
  async findUserByLoginIds<T extends BaseUserModel>(
    idsFilter: LoginIdsFilter,
    include?: IncludeClause,
    silent = false,
  ): Promise<T | undefined> {
    const debug = this.getDebuggerFor(this.findUserByLoginIds);
    debug('Finding user by login identifiers.');
    const localizer = this.getLocalizer();
    const errorKeyPrefix = 'authorizationService.findUserByLoginIds';
    // формирование условий выборки
    const where: WhereClause = {};
    let hasAnyLoginId = false;
    LOGIN_ID_NAMES.forEach(name => {
      if (idsFilter[name] && String(idsFilter[name]).trim()) {
        debug('Given %s was %v.', name, idsFilter[name]);
        hasAnyLoginId = true;
        const idValue = LOWER_CASE_LOGIN_ID_NAMES.includes(name)
          ? String(idsFilter[name]).trim().toLowerCase()
          : String(idsFilter[name]).trim();
        where[name] = idValue;
      }
    });
    // проверка наличия идентификатора
    if (!hasAnyLoginId) {
      debug('No login identifiers was given.');
      if (silent) return;
      const idFields = LOGIN_ID_NAMES.filter(id => id in idsFilter);
      const singleIdField = idFields.length === 1 ? idFields[0] : undefined;
      if (singleIdField && idsFilter[singleIdField] === '')
        throw createError(
          HttpErrors.BadRequest,
          singleIdField.toUpperCase() + '_LOGIN_REQUIRED',
          localizer.t(`${errorKeyPrefix}.${singleIdField}RequiredError`),
        );
      throw createError(
        HttpErrors.BadRequest,
        'LOGIN_IDENTIFIER_REQUIRED',
        localizer.t(`${errorKeyPrefix}.identifierRequiredError`),
      );
    }
    const dbs = this.getRegisteredService(DatabaseSchema);
    const userRep = dbs.getRepository<BaseUserModel>(UserModel.name);
    const user = await userRep.findOne({where, include});
    if (!user) {
      debug('User not found.');
      if (silent) return;
      throw createError(
        HttpErrors.BadRequest,
        'USER_NOT_FOUND',
        localizer.t(`${errorKeyPrefix}.loginFailedError`),
      );
    }
    debug('User found with id %v.', user.id);
    return user as T;
  }

  /**
   * Is attempting to remove last login id.
   *
   * @param idName
   * @param inputData
   * @param existingUser
   */
  protected isAttemptingToRemoveLastLoginId(
    idName: LoginIdName,
    inputData: Partial<BaseUserModel>,
    existingUser: BaseUserModel,
  ): boolean {
    if (inputData[idName] !== '') return false;
    const otherIdentifiers = LOGIN_ID_NAMES.filter(id => id !== idName);
    const isProvidingNewIdentifier = otherIdentifiers.some(id => inputData[id]);
    if (isProvidingNewIdentifier) return false;
    const hasOtherExistingIdentifiers = otherIdentifiers.some(
      id => existingUser[id],
    );
    return !hasOtherExistingIdentifiers;
  }

  /**
   * Validate login id in user data input.
   *
   * @param idName
   * @param data
   * @param localizer
   * @param existingUser
   */
  protected async validateLoginIdInUserDataInput(
    idName: LoginIdName,
    inputData: Partial<BaseUserModel>,
    existingUser?: BaseUserModel,
  ): Promise<void> {
    const debug = this.getDebuggerFor(this.validateLoginIdInUserDataInput);
    debug('Validating login identifier in the user data input.');
    const localizer = this.getLocalizer();
    const titledIdName = idName.charAt(0).toUpperCase() + idName.slice(1);
    const errorKeyPrefix =
      'authorizationService.validateLoginIdInUserDataInput';
    const idValue = inputData[idName];
    debug('Given id name was %v.', idName);
    debug('Given id value was %v.', idValue);
    // если определен существующий пользователь, то данные будут
    // использованы для обновления методом PATCH, а значит проверка
    // значений null и undefined не требуется
    if (existingUser && idValue == null) {
      debug('Existing user was not specified.');
      return;
    }
    // если получено пустое значение, но идентификатор
    // является обязательным, то выбрасывается ошибка
    const isRequired =
      this.options[`require${titledIdName}` as keyof AuthServiceOptions];
    if (isRequired) {
      debug('Identifier was required.');
      if (!idValue) {
        throw createError(
          HttpErrors.BadRequest,
          'LOGIN_IDENTIFIER_REQUIRED',
          localizer.t(`${errorKeyPrefix}.${idName}RequiredError`),
        );
      } else {
        debug('Identifier was optional.');
      }
    }
    if (idValue != null) {
      // проверка формата при наличии значения
      const validator = this.options[`${idName}FormatValidator`];
      validator(idValue, localizer);
      debug('Value format validated.');
      // если найден дубликат идентификатора другого
      // пользователя, то выбрасывается ошибка
      debug('Checking identifier duplicates.');
      const duplicate = await this.findUserByLoginIds(
        {[idName]: idValue},
        undefined,
        true,
      );
      if (duplicate && duplicate.id !== existingUser?.id) {
        const errorKey = `${errorKeyPrefix}.duplicate${titledIdName}Error`;
        throw createError(
          HttpErrors.BadRequest,
          'DUPLICATE_LOGIN_IDENTIFIER',
          localizer.t(errorKey),
        );
      }
      debug('No duplicates found.');
      // если выполняется попытка удаления последнего
      // идентификатора, то выбрасывается ошибка
      if (
        existingUser &&
        this.isAttemptingToRemoveLastLoginId(idName, inputData, existingUser)
      ) {
        throw createError(
          HttpErrors.BadRequest,
          'LOGIN_IDENTIFIER_REQUIRED',
          localizer.t(`${errorKeyPrefix}.${idName}RequiredError`),
        );
      }
    }
    debug('Identifier validated.');
  }

  /**
   * Create user.
   *
   * @param ctx
   * @param data
   * @param include
   */
  async createUser<T extends BaseUserModel, V extends WithoutId<'id', T>>(
    inputData: V,
    include?: IncludeClause,
  ): Promise<T> {
    const debug = this.getDebuggerFor(this.createUser);
    const localizer = this.getLocalizer();
    debug('Creating user.');
    inputData = JSON.parse(JSON.stringify(inputData));
    // обрезка пробелов
    LOGIN_ID_NAMES.forEach(idName => {
      if (typeof inputData[idName] === 'string')
        inputData[idName] = inputData[idName].trim();
    });
    // проверка формата идентификаторов и отсутствия дубликатов
    for (const idName of LOGIN_ID_NAMES) {
      await this.validateLoginIdInUserDataInput(idName, inputData);
    }
    // если ни один идентификатор не определен,
    // то выбрасывается ошибка
    if (LOGIN_ID_NAMES.every(idName => !inputData[idName]))
      throw createError(
        HttpErrors.BadRequest,
        'LOGIN_IDENTIFIER_REQUIRED',
        localizer.t('authorizationService.createUser.identifierRequiredError'),
      );
    // хэширование пароля
    if (this.options.requirePassword || inputData.password) {
      this.options.passwordFormatValidator(inputData.password, localizer);
      inputData.password = await this.hashPassword(inputData.password || '');
      debug('Password hashed.');
    }
    // переопределение даты создания
    inputData.createdAt = new Date().toISOString();
    // создание пользователя
    const dbs = this.getRegisteredService(DatabaseSchema);
    const userRep = dbs.getRepository<BaseUserModel>(UserModel.name);
    const res = await userRep.create(inputData, {include});
    debug('User created.');
    debug('User id was %v.', res.id);
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
    userId: T['id'],
    inputData: Partial<T>,
    include?: IncludeClause,
  ): Promise<T> {
    inputData = JSON.parse(JSON.stringify(inputData));
    const debug = this.getDebuggerFor(this.updateUser);
    debug('Updating user.');
    debug('User id was %v.', userId);
    const localizer = this.getLocalizer();
    const errorKeyPrefix = 'authorizationService.updateUser';
    const dbs = this.getRegisteredService(DatabaseSchema);
    const userRep = dbs.getRepository<BaseUserModel>(UserModel.name);
    const existingUser = await userRep.findOne({where: {id: userId}});
    if (!existingUser)
      throw createError(
        HttpErrors.BadRequest,
        'USER_NOT_FOUND',
        localizer.t(`${errorKeyPrefix}.userNotFoundError`),
      );
    // обрезка пробелов
    LOGIN_ID_NAMES.forEach(idName => {
      if (typeof inputData[idName] === 'string')
        inputData[idName] = inputData[idName].trim();
    });
    // проверка формата идентификаторов и отсутствия дубликатов
    for (const idName of LOGIN_ID_NAMES) {
      await this.validateLoginIdInUserDataInput(
        idName,
        inputData,
        existingUser,
      );
    }
    // удаление ключей для идентификаторов содержащих null и undefined
    LOGIN_ID_NAMES.forEach(idName => {
      if (inputData[idName] == null) delete inputData[idName];
    });
    // если все идентификаторы переданы со значением
    // пустой строки, то выбрасывается ошибка
    if (LOGIN_ID_NAMES.every(idName => inputData[idName] === '')) {
      throw createError(
        HttpErrors.BadRequest,
        'LOGIN_IDENTIFIER_REQUIRED',
        localizer.t(`${errorKeyPrefix}.identifierRequiredError`),
      );
    }
    // хэширование пароля (при наличии)
    if (inputData.password != null) {
      this.options.passwordFormatValidator(inputData.password, localizer);
      inputData.password = await this.hashPassword(inputData.password || '');
      debug('Password hashed.');
    }
    // удаление даты создания и определение
    // даты обновления
    delete inputData.createdAt;
    inputData.updatedAt = new Date().toISOString();
    // обновление документа
    const res = await userRep.patchById(userId, inputData, {include});
    debug('User updated.');
    return res as T;
  }

  /**
   * Find access token by request context.
   *
   * @param ctx
   * @param include
   */
  async findAccessTokenByRequestContext<T extends BaseAccessTokenModel>(
    ctx: RequestContext,
    include?: IncludeClause,
  ): Promise<T | undefined> {
    const debug = this.getDebuggerFor(this.findAccessTokenByRequestContext);
    debug('Finding access token by request context.');
    const jwToken =
      ctx.headers[this.options.jwtHeaderName] ||
      ctx.cookies[this.options.jwtCookieName] ||
      ctx.query[this.options.jwtQueryParam];
    if (!jwToken) {
      debug('JWT not found.');
      return;
    }
    const payload = await this.decodeJwt(jwToken);
    const accessToken = await this.findAccessTokenById(payload.tid, include);
    if (accessToken.ownerId !== payload.uid)
      throw createError(
        HttpErrors.BadRequest,
        'INVALID_ACCESS_TOKEN_OWNER',
        'Your access token not match its owner',
        payload,
      );
    debug('Access token found.');
    debug('Token id was %v.', accessToken.id);
    debug('Owner id was %v.', accessToken.ownerId);
    return accessToken as T;
  }

  /**
   * Find access token owner.
   *
   * @param accessToken
   */
  async findAccessTokenOwner<T extends BaseUserModel>(
    accessToken: BaseAccessTokenModel,
    include?: IncludeClause,
  ): Promise<T> {
    const debug = this.getDebuggerFor(this.findAccessTokenOwner);
    debug('Finding access token owner.');
    if (!accessToken.ownerId)
      throw createError(
        HttpErrors.BadRequest,
        'NO_ACCESS_TOKEN_OWNER',
        'Your access token does not have an owner',
        accessToken,
      );
    const dbs = this.getRegisteredService(DatabaseSchema);
    const rep = dbs.getRepository<BaseUserModel>(UserModel.name);
    const owner = await rep.findOne({
      where: {id: accessToken.ownerId},
      include,
    });
    if (!owner)
      throw createError(
        HttpErrors.BadRequest,
        'NO_ACCESS_TOKEN_OWNER',
        'Your access token does not have an owner',
        accessToken,
      );
    debug('Owner found with id %v.', owner.id);
    return owner as T;
  }

  /**
   * Create auth session.
   *
   * @param ctx
   */
  async createAuthSession(ctx: RequestContext): Promise<AuthSession> {
    const accessToken = await this.findAccessTokenByRequestContext(ctx);
    if (accessToken) {
      const user = await this.findAccessTokenOwner(
        accessToken,
        this.options.sessionUserInclusion,
      );
      return new AuthSession(ctx.container, accessToken, user);
    } else {
      return new AuthSession(ctx.container);
    }
  }
}

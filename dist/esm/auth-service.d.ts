import { AuthSession } from './auth-session.js';
import { Localizer } from '@e22m4u/js-localizer';
import { BaseUserModel } from './models/index.js';
import { WithoutId } from '@e22m4u/js-repository';
import { AuthLocalizer } from './auth-localizer.js';
import { AccessTokenModel } from './models/index.js';
import { IncludeClause } from '@e22m4u/js-repository';
import { ServiceContainer } from '@e22m4u/js-service';
import { RequestContext } from '@e22m4u/js-trie-router';
import { BaseAccessTokenModel } from './models/index.js';
import { DebuggableService } from './debuggable-service.js';
/**
 * Register models options.
 */
type RegisterModelsOptions = {
    datasource?: string;
};
/**
 * Login id names.
 */
export declare const LOGIN_ID_NAMES: readonly ["username", "email", "phone"];
/**
 * Login id.
 */
export type LoginIdName = (typeof LOGIN_ID_NAMES)[number];
/**
 * Lower case login id names.
 */
export declare const LOWER_CASE_LOGIN_ID_NAMES: LoginIdName[];
/**
 * Data format validator.
 */
export type DataFormatValidator = (value: unknown, localizer: Localizer) => void;
/**
 * Auth service options.
 */
export type AuthServiceOptions = {
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
export declare const DEFAULT_AUTH_OPTIONS: AuthServiceOptions;
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
 * Auth service.
 */
export declare class AuthService extends DebuggableService {
    readonly requestContext?: RequestContext | undefined;
    /**
     * Options.
     */
    readonly options: AuthServiceOptions;
    /**
     * Constructor.
     *
     * @param container
     * @param options
     */
    constructor(container?: ServiceContainer, options?: Partial<AuthServiceOptions>, requestContext?: RequestContext | undefined);
    /**
     * Get localizer
     */
    getLocalizer(): AuthLocalizer;
    /**
     * Clone with request context.
     *
     * @param ctx
     */
    cloneWithRequestContext(ctx: RequestContext): AuthService;
    /**
     * Register models.
     */
    registerModels(options?: RegisterModelsOptions): void;
    /**
     * Register hooks.
     */
    registerRequestHooks(): void;
    /**
     * Create access token.
     *
     * @param user
     */
    createAccessToken<T extends BaseAccessTokenModel>(ownerId: string | number, patch?: Partial<T>): Promise<T>;
    /**
     * Remove access token by id.
     *
     * @param tokenId
     */
    removeAccessTokenById(accessTokenId: AccessTokenModel['id']): Promise<boolean>;
    /**
     * Issue JSON Web Token.
     *
     * @param accessToken
     */
    issueJwt(accessToken: BaseAccessTokenModel): Promise<JwtIssueResult>;
    /**
     * Decode Jwt.
     *
     * @param jwToken
     */
    decodeJwt(jwToken: string): Promise<JwtPayload>;
    /**
     * Find access token by id.
     *
     * @param jwToken
     * @param include
     */
    findAccessTokenById<T extends BaseAccessTokenModel>(tokenId: string, include?: IncludeClause): Promise<T>;
    /**
     * Hash password.
     *
     * @param password
     */
    hashPassword(password: string): Promise<string>;
    /**
     * Verify password.
     *
     * @param password
     * @param hash
     * @param silent
     */
    verifyPassword(password: string, hash: string): Promise<true>;
    /**
     * Verify password.
     *
     * @param password
     * @param hash
     * @param silent
     */
    verifyPassword(password: string, hash: string, silent: false): Promise<true>;
    /**
     * Verify password.
     *
     * @param password
     * @param hash
     * @param silent
     */
    verifyPassword(password: string, hash: string, silent: true): Promise<boolean>;
    /**
     * Verify password.
     *
     * @param password
     * @param hash
     * @param silent
     */
    verifyPassword(password: string, hash: string, silent?: boolean): Promise<boolean>;
    /**
     * Find user by login ids.
     *
     * @param lookup
     * @param include
     * @param silent
     */
    findUserByLoginIds<T extends BaseUserModel>(lookup: LoginIdsFilter, include: IncludeClause | undefined): Promise<T>;
    /**
     * Find user by login ids.
     *
     * @param lookup
     * @param include
     * @param silent
     */
    findUserByLoginIds<T extends BaseUserModel>(lookup: LoginIdsFilter, include: IncludeClause | undefined, silent: false): Promise<T>;
    /**
     * Find user by login ids.
     *
     * @param lookup
     * @param include
     * @param silent
     */
    findUserByLoginIds<T extends BaseUserModel>(lookup: LoginIdsFilter, include: IncludeClause | undefined, silent: true): Promise<T | undefined>;
    /**
     * Find user by login ids.
     *
     * @param lookup
     * @param include
     * @param silent
     */
    findUserByLoginIds<T extends BaseUserModel>(lookup: LoginIdsFilter, include?: IncludeClause, silent?: boolean): Promise<T | undefined>;
    /**
     * Validate login id.
     *
     * @param idName
     * @param idValue
     * @param ownerId
     */
    protected validateLoginId(idName: LoginIdName, idValue: unknown, ownerId?: unknown): Promise<void>;
    /**
     * Require any login id.
     *
     * @param inputData
     */
    requireAnyLoginId(data: Record<string, unknown>): Promise<void>;
    /**
     * Create user.
     *
     * @param ctx
     * @param data
     * @param include
     */
    createUser<T extends BaseUserModel, V extends WithoutId<'id', T>>(inputData: V, include?: IncludeClause): Promise<T>;
    /**
     * Update user.
     *
     * @param ctx
     * @param userId
     * @param data
     * @param include
     */
    updateUser<T extends BaseUserModel>(userId: T['id'], inputData: Partial<T>, include?: IncludeClause): Promise<T>;
    /**
     * Find access token by request context.
     *
     * @param ctx
     * @param include
     */
    findAccessTokenByRequestContext<T extends BaseAccessTokenModel>(ctx: RequestContext, include?: IncludeClause): Promise<T | undefined>;
    /**
     * Find access token owner.
     *
     * @param accessToken
     */
    findAccessTokenOwner<T extends BaseUserModel>(accessToken: BaseAccessTokenModel, include?: IncludeClause): Promise<T>;
    /**
     * Create auth session.
     *
     * @param ctx
     */
    createAuthSession(ctx: RequestContext): Promise<AuthSession>;
}
export {};

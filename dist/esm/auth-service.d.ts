import { Localizer } from '@e22m4u/js-localizer';
import { BaseUserModel } from './models/index.js';
import { WithoutId } from '@e22m4u/js-repository';
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
 * User login identifiers.
 */
declare const USER_LOGIN_IDENTIFIERS: readonly ["username", "email", "phone"];
/**
 * User login identifier.
 */
type UserLoginIdentifier = (typeof USER_LOGIN_IDENTIFIERS)[number];
/**
 * Data format validator.
 */
export type DataFormatValidator = (value: unknown, localizer: Localizer) => void;
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
export declare const DEFAULT_AUTH_OPTIONS: AuthServiceOptions;
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
 * Auth service.
 */
export declare class AuthService extends DebuggableService {
    /**
     * Options.
     */
    readonly options: any;
    /**
     * Constructor.
     *
     * @param container
     * @param options
     */
    constructor(container?: ServiceContainer, options?: Partial<AuthServiceOptions>);
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
     * @param patch
     */
    createAccessToken<T extends BaseAccessTokenModel>(user: BaseUserModel, patch?: Partial<T>): Promise<T>;
    /**
     * Remove access token.
     *
     * @param tokenId
     */
    removeAccessToken(accessTokenId: AccessTokenModel['id']): Promise<boolean>;
    /**
     * Access Token to JSON Web Token.
     *
     * @param accessToken
     */
    accessTokenToJwt(accessToken: BaseAccessTokenModel): Promise<{
        token: string;
        expiresAt: number;
    }>;
    /**
     * Verify JWT and find Access Token.
     *
     * @param jwToken
     * @param localizer
     * @param include
     */
    verifyJwtAndFindItsOwner<T extends BaseUserModel>(jwToken: string, localizer: Localizer, include?: IncludeClause): Promise<T>;
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
     */
    verifyPassword(password: string, hash: string): Promise<boolean>;
    /**
     * Find user.
     *
     * @param lookup
     * @param include
     */
    findUser<T extends BaseUserModel>(lookup: UserLookup, include?: IncludeClause): Promise<T | undefined>;
    /**
     * Is attempting to remove last identifier.
     *
     * @param idName
     * @param data
     * @param updatingUser
     */
    protected isAttemptingToRemoveLastIdentifier(idName: UserLoginIdentifier, data: Partial<BaseUserModel>, updatingUser: BaseUserModel): boolean;
    /**
     * Validate user identifier.
     *
     * @param idName
     * @param data
     * @param localizer
     * @param existingUser
     */
    protected validateUserIdentifier(idName: UserLoginIdentifier, data: Partial<BaseUserModel>, localizer: Localizer, existingUser?: BaseUserModel): Promise<void>;
    /**
     * Register user.
     *
     * @param ctx
     * @param data
     * @param include
     */
    createUser<T extends BaseUserModel, V extends WithoutId<'id', T>>(ctx: RequestContext, data: V, include?: IncludeClause): Promise<T>;
    /**
     * Update user.
     *
     * @param ctx
     * @param userId
     * @param data
     * @param include
     */
    updateUser<T extends BaseUserModel>(ctx: RequestContext, userId: T['id'], data: Partial<T>, include?: IncludeClause): Promise<T>;
    /**
     * Find user and validate password.
     *
     * @param ctx
     * @param lookup
     * @param include
     */
    findUserAndValidatePassword<T extends BaseUserModel>(ctx: RequestContext, lookup: UserLookupWithPassword, include?: IncludeClause): Promise<T>;
    /**
     * Find user by request context.
     *
     * @param ctx
     * @param include
     */
    findUserByRequestContext<T extends BaseUserModel>(ctx: RequestContext, include?: IncludeClause): Promise<T | undefined>;
    /**
     * Issue JSON Web Token for User.
     *
     * @param user
     * @param patch
     */
    issueJwtForUser(user: BaseUserModel, patch: object): Promise<{
        token: string;
        expiresAt: number;
    }>;
}
export {};

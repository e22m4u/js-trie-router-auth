import { UserModel } from './models/user-model.js';
import { ServiceContainer } from '@e22m4u/js-service';
import { BaseUserModel } from './models/user-model.js';
import { BaseRoleModel } from './models/role-model.js';
import { DebuggableService } from './debuggable-service.js';
import { AccessTokenModel } from './models/access-token-model.js';
import { BaseAccessTokenModel } from './models/access-token-model.js';
/**
 * Auth session.
 */
export declare class AuthSession<UserType extends BaseUserModel = UserModel, TokenType extends BaseAccessTokenModel = AccessTokenModel> extends DebuggableService {
    /**
     * Access token.
     */
    protected accessToken?: TokenType;
    /**
     * User.
     */
    protected user?: UserType;
    /**
     * Is logged in.
     */
    get isLoggedIn(): boolean;
    /**
     * Get localizer.
     */
    getLocalizer(): import("./auth-localizer.js").AuthLocalizer;
    /**
     * Constructor.
     *
     * @param user
     */
    constructor(container: ServiceContainer, accessToken?: TokenType | undefined, user?: UserType | undefined);
    /**
     * Get user.
     */
    getUser(): UserType;
    /**
     * User id.
     */
    getUserId(): UserType['id'];
    /**
     * Get user roles.
     */
    getUserRoles<T extends BaseRoleModel>(): T[];
    /**
     * Get role names.
     */
    getRoleNames(): string[];
    /**
     * Get access token.
     */
    getAccessToken(): TokenType;
    /**
     * Access token id.
     */
    getAccessTokenId(): TokenType['id'];
}

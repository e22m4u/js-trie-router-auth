import { UserModel } from './models/user-model.js';
import { BaseUserModel } from './models/user-model.js';
import { BaseRoleModel } from './models/role-model.js';
/**
 * User session.
 */
export declare class UserSession<T extends BaseUserModel = UserModel> {
    readonly user?: T | undefined;
    /**
     * Is logged in.
     */
    get isLoggedIn(): boolean;
    /**
     * User id.
     */
    get userId(): string | number | undefined;
    /**
     * Roles.
     */
    get roles(): BaseRoleModel[];
    /**
     * Role names.
     */
    get roleNames(): string[];
    /**
     * Constructor.
     *
     * @param user
     */
    constructor(user?: T | undefined);
}

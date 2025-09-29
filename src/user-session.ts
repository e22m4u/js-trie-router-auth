import {UserModel} from './models/user-model.js';
import {BaseUserModel} from './models/user-model.js';
import {BaseRoleModel} from './models/role-model.js';

/**
 * User session.
 */
export class UserSession<T extends BaseUserModel = UserModel> {
  /**
   * Is logged in.
   */
  get isLoggedIn() {
    return Boolean(this.user);
  }

  /**
   * User id.
   */
  get userId() {
    return this.user?.id;
  }

  /**
   * Roles.
   */
  get roles(): BaseRoleModel[] {
    return this.user?.roles || [];
  }

  /**
   * Role names.
   */
  get roleNames(): string[] {
    return this.roles.map(v => v.name).filter(Boolean) as string[];
  }

  /**
   * Constructor.
   *
   * @param user
   */
  constructor(readonly user?: T | undefined) {}
}

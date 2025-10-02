import HttpErrors from 'http-errors';
import {createError} from './utils/index.js';
import {AuthService} from './auth-service.js';
import {UserModel} from './models/user-model.js';
import {ServiceContainer} from '@e22m4u/js-service';
import {BaseUserModel} from './models/user-model.js';
import {BaseRoleModel} from './models/role-model.js';
import {DebuggableService} from './debuggable-service.js';
import {AccessTokenModel} from './models/access-token-model.js';
import {BaseAccessTokenModel} from './models/access-token-model.js';

/**
 * Auth session.
 */
export class AuthSession<
  UserType extends BaseUserModel = UserModel,
  TokenType extends BaseAccessTokenModel = AccessTokenModel,
> extends DebuggableService {
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
  get isLoggedIn() {
    return Boolean(this.accessToken) && Boolean(this.user);
  }

  /**
   * Get localizer.
   */
  getLocalizer() {
    return this.getService(AuthService).getLocalizer();
  }

  /**
   * Constructor.
   *
   * @param user
   */
  constructor(
    container: ServiceContainer,
    accessToken?: TokenType | undefined,
    user?: UserType | undefined,
  ) {
    super(container);
    this.accessToken = accessToken;
    this.user = user;
  }

  /**
   * Get user.
   */
  getUser(): UserType {
    if (!this.user) {
      const localizer = this.getLocalizer();
      throw createError(
        HttpErrors.Unauthorized,
        'AUTHENTICATION_REQUIRED',
        localizer.t('authSession.getUser.authenticationRequired'),
      );
    }
    return this.user;
  }

  /**
   * User id.
   */
  getUserId(): UserType['id'] {
    return this.getUser().id;
  }

  /**
   * Get user roles.
   */
  getUserRoles<T extends BaseRoleModel>(): T[] {
    return (this.getUser().roles || []) as T[];
  }

  /**
   * Get role names.
   */
  getRoleNames(): string[] {
    return this.getUserRoles()
      .map(v => v.name)
      .filter(v => typeof v === 'string');
  }

  /**
   * Get access token.
   */
  getAccessToken(): TokenType {
    if (!this.accessToken) {
      const localizer = this.getLocalizer();
      throw createError(
        HttpErrors.Unauthorized,
        'AUTHENTICATION_REQUIRED',
        localizer.t('authSession.getAccessTokenId.authenticationRequired'),
      );
    }
    return this.accessToken;
  }

  /**
   * Access token id.
   */
  getAccessTokenId(): TokenType['id'] {
    return this.getAccessToken().id;
  }
}

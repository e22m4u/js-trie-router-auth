import HttpErrors from 'http-errors';
import { createError } from './utils/index.js';
import { AuthService } from './auth-service.js';
import { DebuggableService } from './debuggable-service.js';
/**
 * Auth session.
 */
export class AuthSession extends DebuggableService {
    /**
     * Access token.
     */
    accessToken;
    /**
     * User.
     */
    user;
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
    constructor(container, accessToken, user) {
        super(container);
        this.accessToken = accessToken;
        this.user = user;
    }
    /**
     * Get user.
     */
    getUser() {
        if (!this.user) {
            const localizer = this.getLocalizer();
            throw createError(HttpErrors.Unauthorized, 'AUTHENTICATION_REQUIRED', localizer.t('authSession.getUser.authenticationRequired'));
        }
        return this.user;
    }
    /**
     * User id.
     */
    getUserId() {
        return this.getUser().id;
    }
    /**
     * Get user roles.
     */
    getUserRoles() {
        return (this.getUser().roles || []);
    }
    /**
     * Get role names.
     */
    getRoleNames() {
        return this.getUserRoles()
            .map(v => v.name)
            .filter(v => typeof v === 'string');
    }
    /**
     * Get access token.
     */
    getAccessToken() {
        if (!this.accessToken) {
            const localizer = this.getLocalizer();
            throw createError(HttpErrors.Unauthorized, 'AUTHENTICATION_REQUIRED', localizer.t('authSession.getAccessTokenId.authenticationRequired'));
        }
        return this.accessToken;
    }
    /**
     * Access token id.
     */
    getAccessTokenId() {
        return this.getAccessToken().id;
    }
}

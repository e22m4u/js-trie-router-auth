/**
 * User session.
 */
export class UserSession {
    user;
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
    get roles() {
        return this.user?.roles || [];
    }
    /**
     * Role names.
     */
    get roleNames() {
        return this.roles.map(v => v.name).filter(Boolean);
    }
    /**
     * Constructor.
     *
     * @param user
     */
    constructor(user) {
        this.user = user;
    }
}

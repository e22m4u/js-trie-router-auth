import HttpErrors from 'http-errors';
import { createError } from '../utils/index.js';
import { AuthSession } from '../auth-session.js';
import { AuthLocalizer } from '../auth-localizer.js';
/**
 * Access rule.
 */
export const AccessRule = {
    AUTHENTICATED: '$authenticated',
};
/**
 * Role guard.
 *
 * @param roleName
 */
export function roleGuard(roleName) {
    return function (ctx) {
        const localizer = ctx.container.getRegistered(AuthLocalizer);
        const session = ctx.container.getRegistered(AuthSession);
        // если пользователь не авторизован,
        // то выбрасывается ошибка
        if (!session.isLoggedIn)
            throw createError(HttpErrors.Unauthorized, 'AUTHORIZATION_REQUIRED', localizer.t('roleGuard.authenticationRequired'));
        // если требуемые роли не указаны, то допускается
        // любой аутентифицированный пользователь
        const roleNames = [roleName].flat().filter(Boolean);
        if (!roleNames.length || roleNames.includes(AccessRule.AUTHENTICATED)) {
            return;
        }
        // проверка наличия нужной роли
        const userRoles = session.getRoleNames();
        const isAllowed = userRoles.some(v => roleNames.includes(v));
        if (!isAllowed)
            throw createError(HttpErrors.Forbidden, 'ROLE_NOT_ALLOWED', localizer.t('roleGuard.roleNotAllowed'));
    };
}

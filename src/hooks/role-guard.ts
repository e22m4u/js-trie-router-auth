import HttpErrors from 'http-errors';
import {createError} from '../utils/index.js';
import {UserSession} from '../user-session.js';
import {AuthLocalizer} from '../auth-localizer.js';
import {RequestContext} from '@e22m4u/js-trie-router';
import {RoutePreHandler} from '@e22m4u/js-trie-router';

/**
 * Access rule.
 */
export const AccessRule = {
  AUTHENTICATED: '$authenticated',
} as const;

/**
 * Type of AccessRule.
 */
export type AccessRule = (typeof AccessRule)[keyof typeof AccessRule];

/**
 * Role guard.
 *
 * @param roleName
 */
export function roleGuard(roleName?: string | string[]): RoutePreHandler {
  return function (ctx: RequestContext) {
    const localizer = ctx.container.getRegistered(AuthLocalizer);
    const session = ctx.container.getRegistered(UserSession);
    // если пользователь не определен,
    // то выбрасывается ошибка
    if (!session.user)
      throw createError(
        HttpErrors.Unauthorized,
        'AUTHORIZATION_REQUIRED',
        localizer.t('roleGuard.authenticationRequired'),
      );
    // если требуемые роли не указаны, то допускается
    // любой аутентифицированный пользователь
    const roleNames = !Array.isArray(roleName)
      ? ([roleName].filter(Boolean) as string[])
      : roleName;
    if (!roleNames.length || roleNames.includes(AccessRule.AUTHENTICATED)) {
      return;
    }
    // проверка наличия нужной роли
    const isAllowed = session.roleNames.some(v => roleNames.includes(v));
    if (!isAllowed)
      throw createError(
        HttpErrors.Forbidden,
        'ROLE_NOT_ALLOWED',
        localizer.t('roleGuard.roleNotAllowed'),
      );
  };
}

import {roleGuard} from '../hooks/index.js';
import {beforeAction} from '@e22m4u/ts-rest-router';

/**
 * Require role.
 *
 * @param role
 */
export function requireRole(
  roleName: string | string[],
): ReturnType<typeof beforeAction> {
  return beforeAction(roleGuard(roleName));
}

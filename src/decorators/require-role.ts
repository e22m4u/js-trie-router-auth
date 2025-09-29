import {requireRoleHook} from '../hooks/index.js';
import {beforeAction} from '@e22m4u/ts-rest-router';

/**
 * Require role.
 *
 * @param role
 */
export function requireRole(
  role: string | string[],
): ReturnType<typeof beforeAction> {
  return beforeAction(requireRoleHook(role));
}

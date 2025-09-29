import { beforeAction } from '@e22m4u/ts-rest-router';
/**
 * Require role.
 *
 * @param role
 */
export declare function requireRole(roleName: string | string[]): ReturnType<typeof beforeAction>;

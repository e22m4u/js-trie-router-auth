import { RoutePreHandler } from '@e22m4u/js-trie-router';
/**
 * Access rule.
 */
export declare const AccessRule: {
    readonly AUTHENTICATED: "$authenticated";
};
/**
 * Type of AccessRule.
 */
export type AccessRule = (typeof AccessRule)[keyof typeof AccessRule];
/**
 * Role guard.
 *
 * @param roleName
 */
export declare function roleGuard(roleName?: string | string[]): RoutePreHandler;

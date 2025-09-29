import { Constructor } from '@e22m4u/js-repository';
/**
 * Create error.
 *
 * @param ctor
 * @param code
 * @param message
 * @param details
 * @param args
 */
export declare function createError<T extends object>(ctor: Constructor<T>, code: string, message: string, details?: unknown, ...args: unknown[]): T;

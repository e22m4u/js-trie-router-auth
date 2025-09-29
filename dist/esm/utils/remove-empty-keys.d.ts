/**
 * Empty value prediction.
 */
type EmptyValuePredication = (value: unknown) => boolean;
/**
 * Удаляет ключи объекта с пустыми значениями.
 *
 * @param plainObject
 * @param removeWhen
 */
export declare function removeEmptyKeys<T extends object>(plainObject: T, removeWhen?: EmptyValuePredication): T;
export {};

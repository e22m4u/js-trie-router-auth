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
export function removeEmptyKeys<T extends object>(
  plainObject: T,
  removeWhen: EmptyValuePredication = v => v == null,
): T {
  return Object.fromEntries(
    Object.entries(plainObject).filter(([, value]) => !removeWhen(value)),
  ) as T;
}

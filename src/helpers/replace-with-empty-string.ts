/** fill undefined with "" */
export function replaceWithEmptyString<T extends object>(
  obj: T
): { [K in keyof T]-?: NonNullable<T[K]> } {
  return new Proxy(obj, {
    get(target: any, key) {
      return target[key] ?? "";
    },
  });
}

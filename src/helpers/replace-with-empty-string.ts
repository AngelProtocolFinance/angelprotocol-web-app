/** fill undefined with "" */
export function replace_with_empty_str<T extends object>(
  obj: T
): { [K in keyof T]-?: NonNullable<T[K]> } {
  return new Proxy(obj, {
    get(target: any, key) {
      return target[key] ?? "";
    },
  });
}

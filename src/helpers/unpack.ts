type Base = { container?: string };
export function unpack<T extends string | Base>(
  classes?: T
): Readonly<Required<Exclude<T, string>>> {
  return new Proxy(
    typeof classes === "string" ? { container: classes } : classes || {},
    {
      get(target: any, key) {
        return target[key] ?? "";
      },
    }
  );
}

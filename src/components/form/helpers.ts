type Base = { container?: string };
export function unpack<T extends string | Base>(
  classes?: T
): Readonly<Required<Exclude<T, string>>> {
  if (typeof classes === "string") return { container: classes } as any;
  return new Proxy(classes || {}, {
    get(target: any, key) {
      return target[key] ?? "";
    },
  });
}

export function dateToFormFormat(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
}

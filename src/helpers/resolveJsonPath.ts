export const resolvePath = (object: any, path: string) =>
  path.split(".").reduce((o, p) => (o ? o[p] : {}), object);

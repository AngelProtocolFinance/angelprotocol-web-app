export const resolvePath = (object: any, path: string) =>
  path.split(".").reduce((o, p) => (o ? o[p] : {}), object);

export const getErrorClasses = (errors: any, name: string) => {
  return resolvePath(errors, name)?.message
    ? "!border-1 !border-red dark:!border-red-l2"
    : "";
};

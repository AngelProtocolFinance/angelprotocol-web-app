export const isEmpty = (array: any[]) => array.length === 0;

export const insert = <T>(arr: T[], at: number, item: T): T[] => {
  return [...arr.slice(0, at), item, ...arr.slice(at + 1)];
};

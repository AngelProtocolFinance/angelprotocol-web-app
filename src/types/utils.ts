export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type DiffSet<T> = [keyof T, T[keyof T], T[keyof T]][];

export type SemiPartial<T, K extends keyof T> = { [key in K]: T[key] } & {
  [key in Exclude<keyof T, K>]?: T[key];
};

export type Mapped<T, TType> = { [key in keyof T]: TType };

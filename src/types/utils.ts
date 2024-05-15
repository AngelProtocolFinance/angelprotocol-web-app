export type PartialExcept<T, K extends keyof T> = Partial<
  Pick<T, Exclude<keyof T, K>>
> &
  Pick<T, K>;
export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type PrimitiveValue = number | string | boolean;
export type Diff = [string, PrimitiveValue, PrimitiveValue];

export type SemiPartial<T, K extends keyof T> = { [key in K]: T[key] } & {
  [key in Exclude<keyof T, K>]?: T[key];
};

export type Ensure<T, K extends keyof T> = T & Required<{ [key in K]: T[key] }>;

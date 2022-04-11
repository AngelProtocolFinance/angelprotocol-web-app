export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;
export type ObjectEntries<T> = [T, T[keyof T]][];

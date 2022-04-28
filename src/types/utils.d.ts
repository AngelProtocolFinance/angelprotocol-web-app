declare module "@types-utils" {
  type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;
  type ObjectEntries<T> = [keyof T, T[keyof T]][];
}

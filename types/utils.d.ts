declare module "@types-utils" {
  export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;
  export type ObjectEntries<T> = [keyof T, T[keyof T]][];
}

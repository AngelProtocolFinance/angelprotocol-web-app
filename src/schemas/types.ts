//used in restricting schema attr to those of form Type/Values attribute
export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

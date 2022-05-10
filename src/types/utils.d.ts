declare module "@types-utils" {
  import { SerializedError } from "@reduxjs/toolkit";
  import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

  type Result<T> = {
    data: T;
    error: FetchBaseQueryError | SerializedError;
  };

  type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;
  type ObjectEntries<T> = [keyof T, T[keyof T]][];
}

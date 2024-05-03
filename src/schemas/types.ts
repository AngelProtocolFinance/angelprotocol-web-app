import type { PartialRecord } from "types/utils";
import type { ISchema } from "yup";

export type SchemaShape<T extends object> = PartialRecord<
  keyof T,
  ISchema<any>
>;

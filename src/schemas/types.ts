import { ISchema } from "yup";
import { PartialRecord } from "types/utils";

export type SchemaShape<T extends object> = PartialRecord<
  keyof T,
  ISchema<any>
>;

import { PartialRecord } from "types/utils";
import { ISchema } from "yup";

export type SchemaShape<T extends object> = PartialRecord<
  keyof T,
  ISchema<any>
>;

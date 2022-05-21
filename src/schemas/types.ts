import { PartialRecord } from "types/utils";
import { AnySchema } from "yup";
import Lazy from "yup/lib/Lazy";

export type SchemaShape<T extends object> = PartialRecord<
  keyof T,
  AnySchema | Lazy<AnySchema>
>;

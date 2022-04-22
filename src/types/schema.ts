import { AnySchema } from "yup";
import Lazy from "yup/lib/Lazy";
import { PartialRecord } from "./utils";

export type SchemaShape<T extends object> = PartialRecord<
  keyof T,
  AnySchema | Lazy<AnySchema>
>;

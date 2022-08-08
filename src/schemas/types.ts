import { AnySchema } from "yup";
import Lazy from "yup/lib/Lazy";
import { PartialRecord } from "types/utils";

export type AddrNetwork = "juno" | "bnb" | "eth";

export type SchemaShape<T extends object> = PartialRecord<
  keyof T,
  AnySchema | Lazy<AnySchema>
>;

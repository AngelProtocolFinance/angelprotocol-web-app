import { AnySchema } from "yup";
import Lazy from "yup/lib/Lazy";
import { PartialRecord } from "./utils";

declare module "@types-schema" {
  export type SchemaShape<T extends object> = PartialRecord<
    keyof T,
    AnySchema | Lazy<AnySchema>
  >;
}

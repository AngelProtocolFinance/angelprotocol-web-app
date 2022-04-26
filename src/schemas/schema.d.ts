declare module "@types-schema" {
  import { AnySchema } from "yup";
  import Lazy from "yup/lib/Lazy";
  import { PartialRecord } from "@types-utils";
  export type SchemaShape<T extends object> = PartialRecord<
    keyof T,
    AnySchema | Lazy<AnySchema>
  >;
}

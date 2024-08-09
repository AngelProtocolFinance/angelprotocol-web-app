import type { ImgLink } from "components/ImgEditor";
import { genFileSchema } from "schemas/file";
import { schema as schemaFn, stringNumber } from "schemas/shape";
import { requiredString } from "schemas/string";
import { array, string } from "yup";
import { MAX_SIZE_IN_BYTES, VALID_MIME_TYPES } from "../common";
import type { FormValues as FV } from "./types";

const fileObj = schemaFn<ImgLink>({
  file: genFileSchema(MAX_SIZE_IN_BYTES, VALID_MIME_TYPES).required("required"),
});

const targetTypeKey: keyof FV = "targetType";

export const schema = schemaFn<FV>({
  name: requiredString,
  description: requiredString,
  banner: fileObj,
  logo: fileObj,
  members: array().min(1, "must contain at least one endowment"),
  expiration: string()
    .transform((v) => {
      if (!v) return "";
      return new Date(v).toISOString();
    })
    .datetime("invalid date")
    .test(
      "",
      "must be in the future",
      (v) => !v || v >= new Date().toISOString()
    ),

  fixedTarget: stringNumber(
    (s) =>
      s.when(targetTypeKey, (values, schema) => {
        const [type] = values as [FV["targetType"]];
        return type === "fixed" ? schema.required("required") : schema;
      }),
    (n) => n.positive("must be greater than 0")
  ),
});

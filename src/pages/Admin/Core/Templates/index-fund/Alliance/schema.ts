import * as Yup from "yup";
import { AllianceEditValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredWalletAddr, stringSchema } from "schemas/string";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<AllianceEditValues> = {
  ...proposalShape,
  wallet: requiredWalletAddr(),
  name: stringSchema.required("name is required"),
  logo: stringSchema
    .nullable()
    .required("logo is required")
    .url("url is invalid"),
  website: stringSchema
    .nullable()
    .required("website is required")
    .url("url is invalid"),
};

export const schema = Yup.object(shape);

import * as Yup from "yup";
import { AllianceEditValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { asciiSchema, requiredWalletAddr } from "schemas/string";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<AllianceEditValues> = {
  ...proposalShape,
  wallet: requiredWalletAddr(),
  name: asciiSchema.required("name is required"),
  logo: asciiSchema
    .nullable()
    .required("logo is required")
    .url("url is invalid"),
  website: asciiSchema
    .nullable()
    .required("website is required")
    .url("url is invalid"),
};

export const schema = Yup.object(shape);

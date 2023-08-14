import { ObjectSchema, object, string } from "yup";
import { AllianceEditValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredWalletAddr, url } from "schemas/string";
import { proposalShape } from "../../../../constants";

export const schema = object<any, SchemaShape<AllianceEditValues>>({
  ...proposalShape,
  wallet: requiredWalletAddr(),
  name: string().required("name is required"),
  logo: string().nullable().required("logo is required").url("url is invalid"),
  website: url,
}) as ObjectSchema<AllianceEditValues>;

import { SchemaShape, requiredWalletAddr } from "@ap/schemas";
import * as Yup from "yup";
import { AllianceEditValues } from "@/pages/Admin/types";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<AllianceEditValues> = {
  ...proposalShape,
  wallet: requiredWalletAddr(),
  name: Yup.string().required("name is required"),
  logo: Yup.string()
    .nullable()
    .required("logo is required")
    .url("url is invalid"),
  website: Yup.string()
    .nullable()
    .required("website is required")
    .url("url is invalid"),
};

export const schema = Yup.object(shape);

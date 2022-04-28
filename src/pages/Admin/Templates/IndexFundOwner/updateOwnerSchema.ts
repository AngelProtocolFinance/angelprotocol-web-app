import * as Yup from "yup";
import { IndexFundOwnerValues } from "@types-page/admin";
import { SchemaShape } from "@types-schema";
import { requiredAddress } from "schemas/string";
import { proposalShape } from "../proposalShape";

const indexFundOwnerShape: SchemaShape<IndexFundOwnerValues> = {
  ...proposalShape,
  new_owner: requiredAddress("owner"),
};

export const updateOwnerSchema = Yup.object(indexFundOwnerShape);

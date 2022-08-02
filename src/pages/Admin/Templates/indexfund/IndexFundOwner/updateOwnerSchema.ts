import * as Yup from "yup";
import { IndexFundOwnerValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredAddress } from "schemas/string";
import { proposalShape } from "../../proposalShape";

const indexFundOwnerShape: SchemaShape<IndexFundOwnerValues> = {
  ...proposalShape,
  new_owner: requiredAddress("owner"),
};

export const updateOwnerSchema = Yup.object(indexFundOwnerShape);

import * as Yup from "yup";
import { IndexFundOwnerValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredContractAddr } from "schemas/string";
import { proposalShape } from "../../../../constants";

const indexFundOwnerShape: SchemaShape<IndexFundOwnerValues> = {
  ...proposalShape,
  new_owner: requiredContractAddr,
};

export const updateOwnerSchema = Yup.object(indexFundOwnerShape);

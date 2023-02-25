import * as Yup from "yup";
import { IndexFundOwnerValues } from "@giving/types/pages/admin";
import { SchemaShape } from "schemas/types";
import { requiredContractAddr } from "schemas/string";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<IndexFundOwnerValues> = {
  ...proposalShape,
  new_owner: requiredContractAddr,
};

export const schema = Yup.object(shape);

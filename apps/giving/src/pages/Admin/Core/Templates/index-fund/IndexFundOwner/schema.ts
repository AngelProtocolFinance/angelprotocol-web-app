import { requiredContractAddr } from "@giving/schemas/string";
import * as Yup from "yup";
import { SchemaShape } from "@giving/schemas/types";
import { IndexFundOwnerValues } from "@giving/types/pages/admin";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<IndexFundOwnerValues> = {
  ...proposalShape,
  new_owner: requiredContractAddr,
};

export const schema = Yup.object(shape);

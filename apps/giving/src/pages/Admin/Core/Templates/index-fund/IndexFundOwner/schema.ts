import { SchemaShape, requiredContractAddr } from "@ap/schemas";
import * as Yup from "yup";
import { IndexFundOwnerValues } from "@ap/types/admin";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<IndexFundOwnerValues> = {
  ...proposalShape,
  new_owner: requiredContractAddr,
};

export const schema = Yup.object(shape);

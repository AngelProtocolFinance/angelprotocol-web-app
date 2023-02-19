import { SchemaShape, requiredContractAddr } from "@ap/schemas";
import * as Yup from "yup";
import { FundUpdateValues } from "@ap/types/admin";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<FundUpdateValues> = {
  ...proposalShape,
  newMemberAddr: requiredContractAddr,
};

export const schema = Yup.object(shape);

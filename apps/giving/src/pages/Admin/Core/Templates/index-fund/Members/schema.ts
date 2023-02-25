import { requiredContractAddr } from "@giving/schemas/string";
import * as Yup from "yup";
import { SchemaShape } from "@giving/schemas/types";
import { FundUpdateValues } from "@giving/types/pages/admin";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<FundUpdateValues> = {
  ...proposalShape,
  newMemberAddr: requiredContractAddr,
};

export const schema = Yup.object(shape);

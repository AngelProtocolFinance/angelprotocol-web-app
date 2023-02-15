import * as Yup from "yup";
import { FundUpdateValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredContractAddr } from "schemas/string";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<FundUpdateValues> = {
  ...proposalShape,
  newMemberAddr: requiredContractAddr,
};

export const schema = Yup.object(shape);

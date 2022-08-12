import * as Yup from "yup";
import { FundUpdateValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredContractAddr } from "schemas/string";
import { proposalShape } from "../../proposalShape";

const fundDestroyerShape: SchemaShape<FundUpdateValues> = {
  ...proposalShape,
  newMemberAddr: requiredContractAddr,
};

export const fundDestroyerSchema = Yup.object(fundDestroyerShape);

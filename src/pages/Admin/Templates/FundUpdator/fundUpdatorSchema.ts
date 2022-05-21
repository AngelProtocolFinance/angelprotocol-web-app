import * as Yup from "yup";
import { FundUpdateValues } from "pages/Admin/types";
import { requiredAddress } from "schemas/string";
import { SchemaShape } from "schemas/types";
import { proposalShape } from "../proposalShape";

const fundDestroyerShape: SchemaShape<FundUpdateValues> = {
  ...proposalShape,
  newMemberAddr: requiredAddress("endowment"),
};

export const fundDestroyerSchema = Yup.object(fundDestroyerShape);

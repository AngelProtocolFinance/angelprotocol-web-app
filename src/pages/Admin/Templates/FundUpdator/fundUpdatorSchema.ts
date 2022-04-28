import * as Yup from "yup";
import { FundUpdateValues } from "@types-page/admin";
import { SchemaShape } from "@types-schema";
import { requiredAddress } from "schemas/string";
import { proposalShape } from "../proposalShape";

const fundDestroyerShape: SchemaShape<FundUpdateValues> = {
  ...proposalShape,
  newMemberAddr: requiredAddress("endowment"),
};

export const fundDestroyerSchema = Yup.object(fundDestroyerShape);

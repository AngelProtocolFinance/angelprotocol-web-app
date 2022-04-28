import * as Yup from "yup";
import { FundDestroyValues } from "@types-page/admin";
import { SchemaShape } from "@types-schema";
import { proposalShape } from "../proposalShape";

const fundDestroyerShape: SchemaShape<FundDestroyValues> = {
  ...proposalShape,
};

export const fundDestroyerSchema = Yup.object(fundDestroyerShape);

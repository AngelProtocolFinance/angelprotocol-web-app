import * as Yup from "yup";
import { FundDestroyValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { proposalShape } from "../../proposalShape";

const fundDestroyerShape: SchemaShape<FundDestroyValues> = {
  ...proposalShape,
};

export const fundDestroyerSchema = Yup.object(fundDestroyerShape);

import { SchemaShape } from "@ap/schemas";
import * as Yup from "yup";
import { FundDestroyValues } from "@/pages/Admin/types";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<FundDestroyValues> = {
  ...proposalShape,
};

export const schema = Yup.object(shape);

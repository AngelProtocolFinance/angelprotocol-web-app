import * as Yup from "yup";
import { SchemaShape } from "@giving/schemas/types";
import { FundDestroyValues } from "@giving/types/pages/admin";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<FundDestroyValues> = {
  ...proposalShape,
};

export const schema = Yup.object(shape);

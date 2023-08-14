import { ObjectSchema, object } from "yup";
import { FundDestroyValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { proposalShape } from "../../../../constants";

export const schema = object<any, SchemaShape<FundDestroyValues>>({
  ...proposalShape,
}) as ObjectSchema<FundDestroyValues>;

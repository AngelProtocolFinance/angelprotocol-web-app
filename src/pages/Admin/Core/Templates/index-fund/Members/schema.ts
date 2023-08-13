import { ObjectSchema, object } from "yup";
import { FundUpdateValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredContractAddr } from "schemas/string";
import { proposalShape } from "../../../../constants";

export const schema = object<any, SchemaShape<FundUpdateValues>>({
  ...proposalShape,
  newMemberAddr: requiredContractAddr,
}) as ObjectSchema<FundUpdateValues>;

import { ObjectSchema, object } from "yup";
import { IndexFundOwnerValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredContractAddr } from "schemas/string";
import { proposalShape } from "../../../../constants";

export const schema = object<any, SchemaShape<IndexFundOwnerValues>>({
  ...proposalShape,
  new_owner: requiredContractAddr,
}) as ObjectSchema<IndexFundOwnerValues>;

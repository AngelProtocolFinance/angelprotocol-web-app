import { requiredContractAddr } from "@/schemas/string";
import * as Yup from "yup";
import { IndexFundOwnerValues } from "@/pages/Admin/types";
import { SchemaShape } from "@/schemas/types";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<IndexFundOwnerValues> = {
  ...proposalShape,
  new_owner: requiredContractAddr,
};

export const schema = Yup.object(shape);

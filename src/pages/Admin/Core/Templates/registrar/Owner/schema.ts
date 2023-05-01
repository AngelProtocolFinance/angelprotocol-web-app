import * as Yup from "yup";
import { RegistrarOwnerValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<RegistrarOwnerValues> = {
  ...proposalShape,
  new_owner: requiredWalletAddr(chainIds.polygon),
};

export const schema = Yup.object(shape);

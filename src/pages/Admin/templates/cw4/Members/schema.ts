import * as Yup from "yup";
import { MemberUpdatorValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredPositiveNumber } from "schemas/number";
import { requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";
import { proposalShape } from "../../../constants";

const shape: SchemaShape<MemberUpdatorValues> = {
  ...proposalShape,
  addr: requiredWalletAddr(chainIds.polygon),
  weight: requiredPositiveNumber,
};

export const schema = Yup.object(shape);

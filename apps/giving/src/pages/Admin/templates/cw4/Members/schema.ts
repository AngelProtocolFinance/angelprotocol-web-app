import { requiredPositiveNumber } from "@/schemas/number";
import { requiredWalletAddr } from "@/schemas/string";
import * as Yup from "yup";
import { MemberUpdatorValues } from "@/pages/Admin/types";
import { SchemaShape } from "@/schemas/types";
import { proposalShape } from "../../../constants";

const shape: SchemaShape<MemberUpdatorValues> = {
  ...proposalShape,
  addr: requiredWalletAddr(),
  weight: requiredPositiveNumber,
};

export const schema = Yup.object(shape);

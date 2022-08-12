import * as Yup from "yup";
import { MemberUpdatorValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredPositiveNumber } from "schemas/number";
import { requiredWalletAddr } from "schemas/string";
import { proposalShape } from "../../proposalShape";

const memberUpdateShape: SchemaShape<MemberUpdatorValues> = {
  ...proposalShape,
  addr: requiredWalletAddr(),
  weight: requiredPositiveNumber,
};

export const memberUpdatorSchema = Yup.object(memberUpdateShape);

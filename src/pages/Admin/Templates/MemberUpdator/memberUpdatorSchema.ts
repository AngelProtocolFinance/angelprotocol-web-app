import * as Yup from "yup";
import { MemberUpdatorValues } from "pages/Admin/types";
import { requiredPositiveNumber } from "schemas/number";
import { requiredAddress } from "schemas/string";
import { SchemaShape } from "schemas/types";
import { proposalShape } from "../proposalShape";

const memberUpdateShape: SchemaShape<MemberUpdatorValues> = {
  ...proposalShape,
  addr: requiredAddress("wallet"),
  weight: requiredPositiveNumber,
};

export const memberUpdatorSchema = Yup.object(memberUpdateShape);

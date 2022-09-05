import * as Yup from "yup";
import { EndowmentUpdateValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { EndowmentStatusStrNum as ST } from "types/contracts";
import { requiredPositiveNumber } from "schemas/number";
import { requiredWalletAddr } from "schemas/string";
import { proposalShape } from "../../proposalShape";

const shape: SchemaShape<EndowmentUpdateValues> = {
  ...proposalShape,
  id: requiredPositiveNumber,
  beneficiary: Yup.mixed().when("status", {
    is: (val: ST) => val === "3",
    then: requiredWalletAddr(),
  }),
};
export const schema = Yup.object(shape);

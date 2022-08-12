import * as Yup from "yup";
import { EndowmentUpdateValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { EndowmentStatusStrNum as ST } from "types/server/contracts";
import { requiredContractAddr, requiredWalletAddr } from "schemas/string";
import { proposalShape } from "../../proposalShape";

const endowmentUpdateShape: SchemaShape<EndowmentUpdateValues> = {
  ...proposalShape,
  endowmentAddr: requiredContractAddr,
  status: Yup.mixed().oneOf<ST>(
    ["0", "1", "2", "3"],
    "please select new status"
  ),
  beneficiary: Yup.mixed().when("status", {
    is: (val: ST) => val === "3",
    then: requiredWalletAddr(),
  }),
};
export const endowmentUpdateSchema = Yup.object(endowmentUpdateShape);

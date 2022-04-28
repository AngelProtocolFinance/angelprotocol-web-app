import * as Yup from "yup";
import { EndowmentUpdateValues } from "@types-page/admin";
import { SchemaShape } from "@types-schema";
import { EndowmentStatusStrNum as ST } from "@types-server/contracts";
import { requiredAddress } from "schemas/string";
import { proposalShape } from "../proposalShape";

const endowmentUpdateShape: SchemaShape<EndowmentUpdateValues> = {
  ...proposalShape,
  endowmentAddr: requiredAddress("endowment"),
  status: Yup.mixed().oneOf<ST>(
    ["0", "1", "2", "3"],
    "please select new status"
  ),
  beneficiary: Yup.mixed().when("status", {
    is: (val: ST) => val === "3",
    then: requiredAddress("beneficiary"),
  }),
};
export const endowmentUpdateSchema = Yup.object(endowmentUpdateShape);

import {
  EndowmentStatusStrNum as ST,
  EndowmentStatus as T,
} from "@types-server/contracts";
import * as Yup from "yup";
import { SchemaShape } from "types/schema";
import { requiredAddress } from "schemas/string";
import { ProposalBase, proposalShape } from "../proposalShape";

export type EndowmentUpdateValues = {
  endowmentAddr: string;
  status: ST;
  //address to transfer funds when endowment will be closed
  beneficiary?: string;

  //metadata
  prevStatus?: keyof T;
} & ProposalBase;

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

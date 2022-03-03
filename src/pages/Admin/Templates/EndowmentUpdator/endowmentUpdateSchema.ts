import * as Yup from "yup";
import { PartialRecord } from "types/types";
import { ProposalBase, proposalShape } from "../proposalShape";
import {
  EndowmentStatus as T,
  EndowmentStatusStrNum as ST,
} from "services/terra/registrar/types";
import { addressSchema } from "schemas/schemas";

export type EndowmentUpdateValues = {
  endowmentAddr: string;
  status: ST;
  //address to transfer funds when endowment will be closed
  beneficiary?: string;

  //metadata
  prevStatus?: keyof T;
} & ProposalBase;

const endowmentUpdateShape: PartialRecord<
  keyof EndowmentUpdateValues,
  Yup.AnySchema
> = {
  ...proposalShape,
  endowmentAddr: addressSchema("endowment"),
  status: Yup.mixed().oneOf<ST>(
    ["0", "1", "2", "3"],
    "please select new status"
  ),
  beneficiary: Yup.mixed().when("status", {
    is: (val: ST) => val === "3",
    then: addressSchema("beneficiary"),
  }),
};

export const endowmentUpdateSchema = Yup.object(endowmentUpdateShape);

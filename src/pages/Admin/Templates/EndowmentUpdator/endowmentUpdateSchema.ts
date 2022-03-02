import * as Yup from "yup";
import { PartialRecord } from "types/types";
import { ProposalBase, proposalShape } from "../proposalShape";
import { EndowmentStatus as T } from "services/terra/registrar/types";

export type EndowmentUpdateValues = {
  addr: string;
  status: T[keyof T];
} & ProposalBase;

const endowmentUpdateShape: PartialRecord<
  keyof EndowmentUpdateValues,
  Yup.AnySchema
> = {
  ...proposalShape,
  addr: Yup.string()
    .required("endowment address is required")
    .test("is valid", "endowment address format is not valid", (address) =>
      /^terra[a-z0-9]{39}$/i.test(address as string)
    ),
};

export const endowmentUpdateSchema = Yup.object(endowmentUpdateShape);

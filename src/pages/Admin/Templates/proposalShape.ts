import { stringByteSchema } from "schemas/schemas";
import { PartialRecord } from "types/types";
import * as Yup from "yup";

export type ProposalBase = {
  title: string;
  description: string;
};

export const proposalShape: PartialRecord<keyof ProposalBase, Yup.AnySchema> = {
  title: stringByteSchema("title", 4, 64),
  description: stringByteSchema("description", 4, 1024),
};

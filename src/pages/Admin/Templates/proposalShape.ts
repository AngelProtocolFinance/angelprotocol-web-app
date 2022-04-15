import { stringByteSchema } from "schemas/string";
import { SchemaShape } from "types/schema";

export type ProposalBase = {
  title: string;
  description: string;
};

export const proposalShape: SchemaShape<ProposalBase> = {
  title: stringByteSchema("title", 4, 64),
  description: stringByteSchema("description", 4, 1024),
};

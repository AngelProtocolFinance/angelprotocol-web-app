import { ProposalBase } from "@types-page/admin";
import { SchemaShape } from "@types-schema";
import { stringByteSchema } from "schemas/string";

export const proposalShape: SchemaShape<ProposalBase> = {
  title: stringByteSchema("title", 4, 64),
  description: stringByteSchema("description", 4, 1024),
};

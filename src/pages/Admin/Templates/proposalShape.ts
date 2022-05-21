import { ProposalBase } from "pages/Admin/types";
import { stringByteSchema } from "schemas/string";
import { SchemaShape } from "schemas/types";

export const proposalShape: SchemaShape<ProposalBase> = {
  title: stringByteSchema("title", 4, 64),
  description: stringByteSchema("description", 4, 1024),
};

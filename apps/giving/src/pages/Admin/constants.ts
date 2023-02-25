import { stringByteSchema } from "@giving/schemas/string";
import { SchemaShape } from "@giving/schemas/types";
import { Templates } from "@giving/types/pages/admin";
import { ProposalBase } from "@giving/types/pages/admin";

export const templates: { [key in Templates]: string } = {
  //index fund
  if_alliance: "if_alliance",
  if_create: "if_create",
  if_remove: "if_remove",
  if_members: "if_members",
  if_config: "if_config",
  if_owner: "if_owner",

  //cw3
  cw3_config: "cw3_config",
  cw3_transfer: "cw3_transfer",
  cw3_application: "",
  review_cw3_config: "review_cw3_config",

  //cw4
  cw4_members: "cw4_members",

  //account
  acc_withdraw: "acc_withdraw",
  acc_profile: "acc_profile",
  acc_endow_status: "acc_endow_status",

  //registrar
  reg_config: "reg_config",
  reg_owner: "reg_owner",
};

export const templateRoutes: { [key in Templates | "index"]: string } = {
  ...templates,
  index: "",
};

export const proposalShape: SchemaShape<ProposalBase> = {
  title: stringByteSchema(4, 64),
  description: stringByteSchema(4, 1024),
};

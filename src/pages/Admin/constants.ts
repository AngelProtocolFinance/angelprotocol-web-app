import { Templates } from "pages/Admin/types";
import { ProposalBase } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { stringByteSchema } from "schemas/string";

export const templateRoutes: {
  [key in
    | Exclude<
        Templates,
        "cw3_application" | "acc_invest" | "acc_redeem" | "acc_strategy"
      >
    | "index"]: string;
} = {
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

  //cw4
  cw4_members: "cw4_members",

  //account
  acc_withdraw: "acc_withdraw",
  acc_profile: "acc_profile",
  acc_endow_status: "acc_endow_status",

  //registrar
  reg_config: "reg_config",
  reg_owner: "reg_owner",
  index: "",
};

export const proposalShape: SchemaShape<ProposalBase> = {
  title: stringByteSchema("title", 4, 64),
  description: stringByteSchema("description", 4, 1024),
};

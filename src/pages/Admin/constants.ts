import { Templates } from "pages/Admin/types";

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

  //cw4
  cw4_members: "cw4_members",

  //account
  acc_withdraw: "acc_withdraw",
  acc_profile: "acc_profile",

  //registrar
  reg_endow_status: "reg_endow_status",
  reg_config: "reg_config",
  reg_owner: "reg_owner",
};

import { AdminProposalTypes } from "@types-page/admin";

export const proposalRoutes: { [key in AdminProposalTypes | "index"]: string } =
  {
    index: "",

    //index fund
    "indexfund-alliance-edit": "indexfund-alliance-edit",
    "indexfund-create-fund": "indexfund-create-fund",
    "indexfund-remove-fund": "indexfund-remove-fund",
    "indexfund-update-fund-members": "indexfund-update-fund-members",
    "indexfund-config-update": "indexfund-config-update",
    "indexfund-owner-update": "indexfund-owner-update",

    //admin group
    "admin-group-update-members": "admin-group-update-members",
    "admin-group-update-cw3-config": "admin-group-update-cw3-config",
    "admin-group-fund-transfer": "admin-group-fund-transfer",

    //endowment
    "endowment-update-status": "endowment-update-status",
    "endowment-withdraw": "endowment-withdraw",
    "endowment-update-profile": "endowment-update-profile",

    //registrar
    "registrar-update-config": "registrar-update-config",
    "registrar-update-owner": "registrar-update-owner",
  };

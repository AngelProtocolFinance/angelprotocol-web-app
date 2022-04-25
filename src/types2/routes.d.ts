declare module "@types-routes" {
  type CharityProfilePathParam = { address: string };
  type CharityProfilePathParamName = `${keyof CharityProfilePathParam}`;

  enum siteRoutes {
    home = "/",
    app = "/app",
    admin = "/admin",
  }
  enum webRoutes {
    index = "",
    charities = "for-charities",
    donors = "for-donors",
    about = "about",
    contact = "contact",
  }
  enum appRoutes {
    index = "/",
    dashboard = "dashboard",
    marketplace = "marketplace",
    leaderboard = "leaderboard",
    admin = "admin",
    register = "register",
    login = "login",
    unsdgs = "unsdgs",
    charity = "charity",
    tca = "tca",
    fund = "fund",
    govern = "govern",
    endowment_admin = "endowment-admin",
    donations = "donations",
  }

  enum governRoutes {
    index = "",
    pollDetails = "pollDetails",
  }

  enum charityRoutes {
    overview = "overview",
    endowment = "endowment",
    programs = "programs",
    media = "media",
    governance = "governance",
  }

  enum adminRoutes {
    index = "",
    charity_applications = "charity-applications",
    proposal = "proposal",
    proposals = "proposals",
    proposal_types = "proposal-types",
  }

  enum proposalTypes {
    index = "",
    //index fund
    indexFund_allianceEdits = "indexfund-alliance-edit",
    indexFund_createFund = "indexfund-create-fund",
    indexFund_removeFund = "indexfund-remove-fund",
    indexFund_updateFundMembers = "indexfund-update-fund-members",
    indexFund_configUpdate = "indexfund-config-update",
    indexFund_ownerUpdate = "indexfund-owner-update",
    //admin group
    adminGroup_updateMembers = "admin-group-update-members",
    adminGroup_updateCW3Config = "admin-group-update-cw3-config",
    adminGroup_fundTransfer = "admin-group-fund-transfer",
    //endowment
    endowment_updateStatus = "endowment-update-status",
    endowment_withdraw = "endowment-withdraw",
    endowment_updateProfile = "endowment-update-profile",

    //registrar
    registrar_updateConfig = "registrar-update-config",
    registrar_updateOwner = "registrar-update-owner",
  }
}

export enum appRoutes {
  index = "/",
  dashboard = "/dashboard",
  marketplace = "/marketplace",
  leaderboard = "/leaderboard",
  admin = "/admin",
  register = "/register",
  login = "/login",
  unsdgs = "/unsdgs",
  profile = "/profile",
  tca = "/tca",
  fund = "/fund",
  govern = "/govern",
  endowment_admin = "/endowment-admin",
  donations = "/donations",
}

export enum governRoutes {
  index = "",
  pollDetails = "pollDetails",
}

export enum charityRoutes {
  overview = "overview",
  endowment = "endowment",
  programs = "programs",
  media = "media",
  governance = "governance",
}

export enum adminRoutes {
  //base routes
  index = "",
  proposal = "proposal",
  proposals = "proposals",
  templates = "templates",
  edit_profile = "edit-profile",
}

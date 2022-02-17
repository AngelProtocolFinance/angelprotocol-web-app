export enum web {
  index = "",
  charities = "for-charities",
  privacy = "privacy-policy",
  donors = "for-donors",
  about = "about",
  contact = "contact",
}

export enum site {
  home = "/",
  app = "/app",
  admin = "/admin",
}

export enum app {
  index = "/",
  dashboard = "dashboard",
  marketplace = "marketplace",
  leaderboard = "leaderboard",
  admin = "admin",
  register = "register",
  login = "login",
  unsdgs = "unsdgs",
  charity = "charity",
  charity_edit = "charity-edit",
  tca = "tca",
  fund = "fund",
  govern = "govern",
  auction = "auction",
  endowment = "endowment",
}

export enum govern {
  index = "",
  poll = "poll",
}

export enum charity {
  overview = "/overview",
  endowment = "/endowment",
  programs = "/programs",
  media = "/media",
  governance = "/governance",
}

export type Handler = () => void;

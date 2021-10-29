export enum Names {
  apollo = "Apollo",
  angel_validator = "Angel Validator",
  smartstake = "SmartStake",
  luna_orbit = "Luna Orbit",
  lo_terra = "LoTerra",
  loop = "Loop",
  apollo_dao = "ApolloDAO",
  plutos_pot = "Pluto's Pot",
  kujira = "Kujira",
  orion = "Orion",
  bet_terra = "BetTerra",
  crypto11 = "Crypto11",
  white_whale = "White Whale",
  talis = "Talis",
  pylon = "Pylon",
  kash = "Kash",
  spar = "Spar",
  kado = "Kado",
  fantasy_investar = "Fantasy Investar",
  spaar = "Spaar (NL)",
  mavolo = "Mavolo",
  star_terra = "StarTerra",
  astral = "Astral",
  alice = "Alice",
  tsunami = "Tsunami",
  kinetic_money = "Kinetic Money",
  edge = "Edge",
  neptune = "Neptune",
  tiik = "Tiiik",
  terrans = "Terrans",
  tales_of_terra = "Tales of Terra",
  luna_bulls = "LunaBulls",
  astronorcs = "Astronorcs",
  luna_millionaire_portrait = "Luna Millionaire Portrait",
  terra_fits = "TerraFits",
  galactic_punks = "Galactic Punks",
  luna_lapins = "LunaLapins",
  knowhere_art = "Knowhere Art",
  terrapins = "Terrapins",
  luna_apes = "LunApe",
  hero = "Hero",
  community = "Community",
  west_coast_wonder = "West Coast Wonder",
}

export type Details = {
  icon: string;
  iconLight: boolean;
  amount: number;
};

export type MemberInfo = {
  [key in Names]: Details;
};

export type Sums = {
  [index: string]: Details;
};

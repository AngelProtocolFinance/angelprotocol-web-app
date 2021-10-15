import { Names } from "./types";

//index as enum of addresses to avoid duplicates
export type Donors = { [index: string]: Names };
export const donors: Donors = {
  terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmq: Names.angel_validator,
  terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmb: Names.apollo,
  terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmc: Names.apollo,
  terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmd: Names.apollo,
};

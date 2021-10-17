import { Donation } from "contracts/types";
import { Names } from "./types";
import { Donors } from "./donors";

export const donors: Donors = {
  terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmq: Names.alice,
  terra178u9lz89f54njqz6nentst3m9nye2cc7ezssma: Names.apollo,
  terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmb: Names.apollo,
  terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmc: Names.angel_validator,
  terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmd: Names.angel_validator,
  terra178u9lz89f54njqz6nentst3m9nye2cc7ezssme: Names.kado,
  terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmf: Names.kado,
  terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmg: Names.kado,
};

export const donations: Donation[] = [
  {
    address: "terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmq",
    total_ust: "1000000",
  },
  {
    address: "terra178u9lz89f54njqz6nentst3m9nye2cc7ezssma",
    total_ust: "1005000",
  },
  {
    address: "terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmb",
    total_ust: "1005000",
  },
  {
    address: "terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmc",
    total_ust: "1000000",
  },
  {
    address: "terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmd",
    total_ust: "1000000",
  },
  {
    address: "terra178u9lz89f54njqz6nentst3m9nye2cc7ezssme",
    total_ust: "1000000",
  },
  {
    address: "terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmf",
    total_ust: "1000000",
  },
  {
    address: "terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmg",
    total_ust: "1000000",
  },
];

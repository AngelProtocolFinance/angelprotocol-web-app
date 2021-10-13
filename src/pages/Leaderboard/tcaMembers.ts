import icon1 from "assets/icons/sponsors/alice.png";

export enum Names {
  apollo = "apollo",
  ap = "angel protocol",
  others = "others",
}

//index as enum of addresses to avoid duplicates
type Donors = { [index: string]: Names };
type Picture = { [key in Names]: string };

export const donors: Donors = {
  terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmq: Names.ap,
  terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmb: Names.apollo,
  terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmc: Names.apollo,
  terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmd: Names.apollo,
};

export type Sums = {
  [key in Names]?: number;
};

export const pictures: Picture = {
  [Names.ap]: icon1,
  [Names.apollo]: icon1,
  [Names.others]: icon1,
};

// export const testDonors: Donor[] = [
//   {
//     address: "terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmq",
//     total_ust: "1000",
//   },
//   {
//     address: "terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmb",
//     total_ust: "1000",
//   },
//   {
//     address: "terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmc",
//     total_ust: "1000",
//   },
//   {
//     address: "terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmd",
//     total_ust: "1000",
//   },
//   {
//     address: "terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmx",
//     total_ust: "1000",
//   },
//   {
//     address: "terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmy",
//     total_ust: "1000",
//   },
// ];

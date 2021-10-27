import { Names } from "./types";

//index as enum of addresses to avoid duplicates
export type Donors = { [index: string]: Names };
export const donors: Donors = {
  terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmq: Names.angel_validator,
  terra18n2pc9x6q9str9dz8sqpt7ulz5telutclkzaec: Names.luna_apes,
  terra17me29hk8cdd6mm6uf7cf0amsxmzxnszkfe5ph4: Names.luna_bulls,
  terra1r59snugfm3gxjas565jf5ehw54junlfpmspjan: Names.luna_bulls,
};

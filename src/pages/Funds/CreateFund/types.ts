import type { ImgLink } from "components/ImgEditor";

export interface FundMember {
  id: number;
  name: string;
  logo?: string;
}

export interface FormValues {
  name: string;
  description: string;
  logo: ImgLink;
  banner: ImgLink;
  expiration: string;
  featured: boolean;
  /** 1 - 100*/
  liquidSplitPct: number;
  allowBgTip: boolean;
  members: FundMember[];
}

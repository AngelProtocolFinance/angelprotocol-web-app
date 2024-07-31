import type { ImgLink } from "components/ImgEditor";

export interface FundMember {
  id: number;
  name: string;
  logo?: string;
}

export interface Settings {
  /** endowname or fund */
  from: string;
  liquidSplit: number;
  allowBgTip: boolean;
}

export type TargetType = "fixed" | "none" | "smart";

export interface FormValues {
  name: string;
  description: string;
  logo: ImgLink;
  banner: ImgLink;
  expiration: string;
  featured: boolean;
  members: FundMember[];
  settings: Settings;
  targetType: TargetType;
  fixedTarget: string;
}

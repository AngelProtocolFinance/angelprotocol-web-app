import type { ImgLink } from "components/ImgEditor";
import type { TargetType } from "../common";

export interface FundMember {
  id: number;
  name: string;
  logo?: string;
}

export interface Settings {
  /** endowname or fund */
  from: string;
  allowBgTip: boolean;
}

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

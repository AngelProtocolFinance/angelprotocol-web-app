import type { ImgLink } from "components/ImgEditor";
import type { Fund } from "types/aws";
import type { TargetType } from "../common";

export interface FV extends Pick<Fund, "name" | "description"> {
  targetType: TargetType;
  fixedTarget: string;
  banner: ImgLink;
  logo: ImgLink;
}

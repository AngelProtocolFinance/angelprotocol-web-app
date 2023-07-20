import { OverrideProperties } from "type-fest";
import { MileStone, Program } from "types/aws";
import { ImgLink } from "components/ImgEditor";

export type FormMilestone = OverrideProperties<
  MileStone,
  { milestone_media: ImgLink }
>;

export type FV = {
  title: string;
  image: ImgLink;
  description: string;
  milestones: FormMilestone[];
  initial?: Program;
};

import { OverrideProperties } from "type-fest";
import { MileStone, Program } from "types/aws";
import { RichTextContent } from "types/components";
import { ImgLink } from "components/ImgEditor";

export type FormMilestone = OverrideProperties<
  MileStone,
  { milestone_media: ImgLink; milestone_description: RichTextContent }
> & {
  //meta
  idx: number;
};

export type FV = {
  title: string;
  image: ImgLink;
  description: RichTextContent;
  milestones: FormMilestone[];
  initial?: Program;
};

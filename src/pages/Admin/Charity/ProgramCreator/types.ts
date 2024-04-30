import { ImgLink } from "components/ImgEditor";
import { OverrideProperties } from "type-fest";
import { MileStone, Program } from "types/aws";
import { RichTextContent } from "types/components";

export type FormMilestone = OverrideProperties<
  MileStone,
  { media: ImgLink; description: RichTextContent }
>;

export type FV = {
  title: string;
  image: ImgLink;
  description: RichTextContent;
  milestones: FormMilestone[];
  initial?: Program;
};

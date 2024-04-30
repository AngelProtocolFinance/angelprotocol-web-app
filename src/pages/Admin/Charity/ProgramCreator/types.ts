import { ImgLink } from "components/ImgEditor";
import { OverrideProperties } from "type-fest";
import { Milestone } from "types/aws";
import { RichTextContent } from "types/components";

export type FormMilestone = OverrideProperties<
  Omit<Milestone, "id">,
  { media: ImgLink; description: RichTextContent }
> & { idx: number };

export type FV = {
  title: string;
  image: ImgLink;
  description: RichTextContent;
  milestones: FormMilestone[];
};

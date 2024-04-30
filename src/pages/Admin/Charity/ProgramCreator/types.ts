import { ImgLink } from "components/ImgEditor";
import { OverrideProperties } from "type-fest";
import { MileStone } from "types/aws";
import { RichTextContent } from "types/components";

export type FormMilestone = OverrideProperties<
  Omit<MileStone, "id">,
  { media: ImgLink; description: RichTextContent }
> & { idx: number };

export type FV = {
  title: string;
  image: ImgLink;
  description: RichTextContent;
  milestones: FormMilestone[];
};

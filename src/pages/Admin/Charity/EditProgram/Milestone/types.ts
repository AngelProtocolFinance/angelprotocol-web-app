import { ImgLink } from "components/ImgEditor";
import { OverrideProperties } from "type-fest";
import { Milestone } from "types/aws";
import { RichTextContent } from "types/components";

export type FV = OverrideProperties<
  Omit<Milestone, "id">,
  { media: ImgLink; description: RichTextContent }
>;

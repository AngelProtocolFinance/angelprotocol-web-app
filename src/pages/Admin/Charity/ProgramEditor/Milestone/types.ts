import type { ImgLink } from "components/ImgEditor";
import type { OverrideProperties } from "type-fest";
import type { Milestone } from "types/aws";
import type { RichTextContent } from "types/components";

export type FV = OverrideProperties<
  Omit<Milestone, "id">,
  { media: ImgLink; description: RichTextContent }
>;

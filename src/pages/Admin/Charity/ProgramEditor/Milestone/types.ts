import type { Milestone } from "@better-giving/endowment";
import type { ImgLink } from "components/ImgEditor";
import type { OverrideProperties } from "type-fest";
import type { RichTextContent } from "types/components";

export type FV = OverrideProperties<
  Omit<Milestone, "id">,
  { media: ImgLink; description: RichTextContent }
>;

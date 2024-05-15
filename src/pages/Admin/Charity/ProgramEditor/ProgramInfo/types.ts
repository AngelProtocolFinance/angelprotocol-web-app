import type { ImgLink } from "components/ImgEditor";
import type { RichTextContent } from "types/components";

export type FV = {
  title: string;
  image: ImgLink;
  description: RichTextContent;
};

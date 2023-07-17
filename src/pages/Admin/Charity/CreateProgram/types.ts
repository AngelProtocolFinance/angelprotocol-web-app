import { Program } from "types/aws";
import { ImgLink } from "components/ImgEditor";

export type FV = {
  title: string;
  image: ImgLink;
  description: string;

  initial?: Program;
};

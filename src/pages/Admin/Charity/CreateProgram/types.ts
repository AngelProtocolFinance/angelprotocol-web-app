import { ImgLink } from "components/ImgEditor";

export type FV = {
  title: string;
  image: ImgLink;
  description: string;

  //meta
  action: "edit" | "create";
};

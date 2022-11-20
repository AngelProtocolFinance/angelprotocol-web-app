import { Profile } from "../../types";
import { ImgLink } from "components/ImgEditor";

export type FormValues = Pick<Profile, "overview"> & {
  banner: ImgLink;
  logo: ImgLink;
  ref: string;
};

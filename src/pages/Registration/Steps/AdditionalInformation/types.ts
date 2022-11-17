import { Profile } from "services/types";
import { ImgLink } from "components/ImgEditor";

export type FormValues = Pick<Profile, "overview"> & {
  banner: ImgLink;
  logo: ImgLink;
  ref: string;
};

import { EndowmentProfileUpdate } from "types/aws";
import { ImgLink } from "components/ImgEditor";

export type FormValues = Omit<
  EndowmentProfileUpdate,
  | "logo"
  | "image"
  /** not editable fields*/
  | "id"
  | "tier"
  | "owner"
> & {
  logo: ImgLink;
  image: ImgLink;
};

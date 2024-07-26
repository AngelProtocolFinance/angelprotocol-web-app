import type { ImgLink } from "components/ImgEditor";

export interface FormValues {
  name: string;
  description: string;
  logo: ImgLink;
  banner: ImgLink;
  expiration: string;
  featured: boolean;
}

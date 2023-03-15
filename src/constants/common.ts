import angelProtocolLogo from "assets/images/angelgiving-H-logo-beta-wht.svg";
import { ImageProps } from "components/Image";

// CONFIGURE THE CONSTANTS BELOW TO DISPLAY THE DESIRED REPEATING TEXT/IMAGES THROUGHOUT THE APP
export const APP_NAME = "Angel Giving";
export const BASE_DOMAIN = "https://angelgiving.io";
export const DAPP_DOMAIN = "https://app.angelgiving.io";
export const SUBDOMAIN_BUILDER = (subdomain: string) =>
  `https://${subdomain}.angelgiving.io`;
export const SEO_IMAGE =
  "https://charity-profile-images.s3.amazonaws.com/logo/angelprotocol-wings-bl.png";
export const EMAIL_SUPPORT = "support@angelgiving.io";
export const GENERIC_ERROR_MESSAGE = `An error occurred. Please get in touch with ${EMAIL_SUPPORT} if the problem persists.`;

export const AP_LOGO: ImageProps = {
  href: "https://angelprotocol.io/",
  src: angelProtocolLogo,
  title: "Go to Marketing page",
};

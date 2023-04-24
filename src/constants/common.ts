import { EndowDesignation } from "types/aws";
import angelGivingLogoBlu from "assets/images/angelgiving-H-logo-beta-blu.svg";
import angelGivingLogoWht from "assets/images/angelgiving-H-logo-beta-wht.svg";
import angelProtocolLogoWht from "assets/images/angelprotocol-H-logo-beta-wht.svg";
import angelProtocolLogoBlu from "assets/images/angelprotocol-beta-horiz-blu.svg";
import { IconType } from "components/Icon";
import { ImageProps } from "components/Image";
import { IS_AST } from "./env";

// CONFIGURE THE CONSTANTS BELOW TO DISPLAY THE DESIRED REPEATING TEXT/IMAGES THROUGHOUT THE APP
export const APP_NAME = IS_AST ? "Angel Protocol" : "Angel Giving";
export const DOMAIN = IS_AST ? "angelprotocol.io" : "angelgiving.io";

export const BASE_DOMAIN = `https://${DOMAIN}`;
export const DAPP_DOMAIN = `https://app.${DOMAIN}`;
export const SUBDOMAIN_BUILDER = (subdomain: string, domain: string) =>
  `https://${subdomain}.${domain}`;
export const SEO_IMAGE =
  "https://charity-profile-images.s3.amazonaws.com/logo/angelprotocol-wings-bl.png";
export const EMAIL_SUPPORT = `support@${DOMAIN}`;
export const GENERIC_ERROR_MESSAGE = `An error occurred. Please get in touch with ${EMAIL_SUPPORT} if the problem persists.`;

export const AP_LOGO: ImageProps = {
  href: BASE_DOMAIN,
  src: IS_AST ? angelProtocolLogoWht : angelGivingLogoWht,
  title: "Go to Marketing page",
};

export const AP_LOGO_LIGHT: ImageProps = {
  href: BASE_DOMAIN,
  src: IS_AST ? angelProtocolLogoBlu : angelGivingLogoBlu,
  title: "Go to Marketing page",
};

export const ENDOW_DESIGNATIONS: {
  label: string;
  value: EndowDesignation;
  icon: IconType;
}[] = [
  { label: "Charity", value: "Charity", icon: "Charity" },
  {
    label: "Religious Organization",
    value: "Religious Organization",
    icon: "ReligiousOrganization",
  },
  { label: "University", value: "University", icon: "University" },
  { label: "Hospital", value: "Hospital", icon: "Hospital" },
  { label: "Other", value: "Other", icon: "Charity" },
];

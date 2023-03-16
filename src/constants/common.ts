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

export const ENDOW_DESIGNATIONS = [
  { label: "Charity", value: "Non-Profit", icon: "Charity" },
  {
    label: "Religious Organization",
    value: "Religious Non-Profit",
    icon: "ReligiousOrganization",
  },
  { label: "University", value: "University", icon: "University" },
  { label: "Hospital", value: "Hospital", icon: "Hospital" },
  { label: "Other", value: "Other", icon: "Charity" },
];

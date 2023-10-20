import { EndowDesignation } from "types/aws";
import { IconType } from "components/Icon";
import { ImageProps } from "components/Image";
import { BASE_URL, EMAIL_SUPPORT, LOGO_IMG_DARK } from "./env";

export const GENERIC_ERROR_MESSAGE = `An error occurred. Please get in touch with ${EMAIL_SUPPORT} if the problem persists.`;

// SETTING LOGO IMAGES & URLS
export const LOGO_DARK: ImageProps = {
  href: BASE_URL,
  src: LOGO_IMG_DARK,
  title: "Go to Marketing page",
};

// AS OF NOW, ONLY APPLIES TO CHARITY ENDOWMENTS
export const ENDOW_DESIGNATIONS: {
  label: string;
  value: EndowDesignation;
  icon: IconType;
}[] = [
  { label: "Charity", value: "Charity", icon: "HeartFill" },
  {
    label: "Religious Organization",
    value: "Religious Organization",
    icon: "ReligiousOrganization",
  },
  { label: "University", value: "University", icon: "University" },
  { label: "Hospital", value: "Hospital", icon: "Hospital" },
  { label: "Other", value: "Other", icon: "Charity" },
];

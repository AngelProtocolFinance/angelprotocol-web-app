import { EndowDesignation } from "types/aws";
import { IconType } from "components/Icon";
import { ImageProps } from "components/Image";
import {
  BASE_URL,
  EMAIL_SUPPORT,
  IS_AST,
  LOGO_IMG_DARK,
  LOGO_IMG_LIGHT,
} from "./env";

export const GENERIC_ERROR_MESSAGE = `An error occurred. Please get in touch with ${EMAIL_SUPPORT} if the problem persists.`;

// SETTING LOGO IMAGES & URLS
export const LOGO_DARK: ImageProps = {
  href: BASE_URL,
  src: LOGO_IMG_DARK,
  title: "Go to Marketing page",
};
export const LOGO_LIGHT: ImageProps = {
  href: BASE_URL,
  src: LOGO_IMG_LIGHT,
  title: "Go to Marketing page",
};

// NOUN AND ACTION WORDS RELATING TO PAYMENTS TO AP/AG ENDOWMENTS
// (AST == Contribution/Contribute & Charity == Donation/Donate)
export const PAYMENT_WORDS = {
  payer: IS_AST ? "contributor" : "donor",
  noun: {
    singular: IS_AST ? "contribution" : "donation",
    plural: IS_AST ? "contributions" : "donations",
  },
  verb: IS_AST ? "contribute" : "donate",
  accounts: {
    locked: IS_AST ? "locked" : "endowment",
    liquid: IS_AST ? "liquid" : "current",
  },
};
export const titleCase = (word: string) =>
  word.charAt(0).toUpperCase() + word.substr(1);

// AS OF NOW, ONLY APPLIES TO CHARITY ENDOWMENTS
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

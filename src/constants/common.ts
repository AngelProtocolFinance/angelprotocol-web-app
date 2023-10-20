import { EndowDesignation } from "types/aws";
import { IconType } from "components/Icon";
import { EMAIL_SUPPORT } from "./env";

export const GENERIC_ERROR_MESSAGE = `An error occurred. Please get in touch with ${EMAIL_SUPPORT} if the problem persists.`;

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

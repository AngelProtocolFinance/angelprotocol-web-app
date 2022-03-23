import defaultIcon from "assets/icons/tca/Angel-Alliance-logo.png";
import { MemberDetails } from "./types";

export const allianceMemberDetails: Omit<MemberDetails, "address"> = {
  name: "New member",
  icon: defaultIcon,
  isPlaceholder: true,
};

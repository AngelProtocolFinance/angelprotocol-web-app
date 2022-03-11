import defaultIcon from "assets/icons/tca/Angel-Alliance-logo.png";
import { MemberDetails } from "./types";

export const allianceMemberDetails: Omit<MemberDetails, "address"> = {
  name: "Unknown member",
  icon: defaultIcon,
};

import { Charity } from "types/aws";

export default function isRegistrationEditable(charity: Charity): boolean {
  return charity.Registration.RegistrationStatus === "Inactive";
}

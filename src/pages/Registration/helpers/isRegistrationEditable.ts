import { Charity } from "types/aws";

export function isRegistrationEditable(charity: Charity): boolean {
  return charity.Registration.RegistrationStatus === "Inactive";
}

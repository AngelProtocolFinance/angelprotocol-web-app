import { Application } from "types/aws";

export function isRegistrationEditable(application: Application): boolean {
  return (
    application.Registration.RegistrationStatus === "Inactive" ||
    application.Registration.RegistrationStatus === "Rejected"
  );
}

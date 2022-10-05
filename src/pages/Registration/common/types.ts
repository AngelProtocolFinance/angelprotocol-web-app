import { PropsWithChildren } from "react";
import { ContactPerson, Registration } from "types/aws";

export type InputProps = PropsWithChildren<{
  classes?: string;
  htmlFor?: string;
  label: string;
  required?: true | boolean;
  infoModal?: React.FC<{}>;
}>;

export type VerifEmailBody = Pick<
  ContactPerson,
  "Email" | "FirstName" | "LastName" | "Role" | "PhoneNumber"
> &
  Pick<Registration, "OrganizationName">;

import { ContactPerson } from "services/aws/registration/types";

export type FormValues = ContactPerson & { ref: string };

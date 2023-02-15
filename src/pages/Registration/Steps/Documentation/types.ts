import { Documentation } from "pages/Registration/types";
import { CountryOption } from "services/types";

export type FormValues = Omit<Documentation, "level" | "hqCountry"> & {
  level: never;
  hqCountry: CountryOption;
};

import { RegistrationStatus } from "./registration";

export type ApplicationsQueryParams = {
  limit?: number; // Number of items to be returned per request
  start?: number; //to load next page, set start to ItemCutOff + 1
  hqCountry?: string;
  regStatus?: RegistrationStatus;
  regAfterDate?: string; //ISO string
  regBeforeDate?: string; //ISO string
};

export type ApplicationsQueryParams = {
  uuid: string;
  regAfterDate?: string;
  regBeforeDate?: string;
  regStatus?: string;
  start?: number; //to load next page, set start to ItemCutOff + 1
  limit?: number; // Number of items to be returned per request
};

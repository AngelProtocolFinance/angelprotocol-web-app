export type ApplicationsQueryParams = {
  uuid: string;
  afterDate?: string;
  beforeDate?: string;
  chainName?: string;
  denomination?: string;
  regStatus?: string;
  start?: number; //to load next page, set start to ItemCutOff + 1
  limit?: number; // Number of items to be returned per request
};

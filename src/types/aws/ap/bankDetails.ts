/**
 * Defines format of the request to send to our AWS Wise proxy
 */
export type WiseRequest = {
  method: "GET" | "POST" | "DELETE" | "PUT";
  url: string;
  headers?: Record<string, string>;
  payload?: string; // stringified payload as needed
  endowment_id?: number; // only needed if request is "create a recipient"
};

/**
 * See https://docs.wise.com/api-docs/api-reference/recipient#account-requirements
 */
export type AccountRequirements = {
  type: string;
  title: string;
  usageInfo: string | null;
  fields: Field[];
};

export type Field = {
  name: string;
  group: Group[];
};

export type Group = {
  key: string;
  name: string;
  type: "radio" | "select" | "text" | "date";
  refreshRequirementsOnChange: boolean;
  required: boolean;
  displayFormat: null;
  example: string;
  minLength: number | null;
  maxLength: number | null;
  validationRegexp: string | null;
  validationAsync: ValidationAsync | null;
  valuesAllowed: ValuesAllowed[] | null;
};

type ValidationAsync = {
  url: string;
  params: Param[];
};

type Param = {
  key: string;
  parameterName: string;
  required: boolean;
};

type ValuesAllowed = {
  key: string;
  name: string;
};

export type CreateRecipientRequest = {
  currency: string;
  type: string;
  accountHolderName: string;
  details: Record<string, string>;
};

export type Quote = { id: string };

/**
 * See https://docs.wise.com/api-docs/api-reference/currencies
 */
export type WiseCurrency = {
  code: string;
  symbol: string;
  name: string;
  countryKeywords: string[];
  supportsDecimals: boolean;
};

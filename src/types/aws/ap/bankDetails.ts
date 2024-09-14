type Field = {
  name: string;
  group: Group[];
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

type DisplayField = {
  key: string;
  label: string;
  value: string;
};

//https://docs.wise.com/api-docs/api-reference/recipient#object-v2
export type V2RecipientAccount = {
  id: number;
  longAccountSummary: string;
  name: { fullName: string };
  currency: string; //3-letter code
  country: string; //country code
  type: string;
  legalEntityType: "PERSON" | "BUSINESS";
  displayFields: DisplayField[];
};

//FUTURE: move wise types to types/wise
export type V1RecipientAccount = {
  id: number;
  currency: string;
  details: {
    accountNumber?: string;
    email?: string;
    bankCode?: string;
    bankName?: string;
  };
};

export type CreateRecipientRequest = {
  accountHolderName: string;
  currency: string;
  ownedByCustomer: false;
  profile: "{{profileId}}";
  type: string;
  details: Record<
    string,
    // root field values
    | string
    // address object field
    | Record<string, string>
    // undefined or non-set values
    | undefined
  >;
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

type ValidationError = {
  code: string;
  message: string;
  arguments: string[]; //key, value
  path: string;
};

//https://docs.wise.com/api-docs/features/errors#validation-errors
export type ValidationContent = {
  timestamp: string;
  errors: ValidationError[];
};

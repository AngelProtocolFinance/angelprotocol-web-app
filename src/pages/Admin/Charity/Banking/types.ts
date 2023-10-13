export interface AccountRequirements {
  type: string;
  title: string;
  usageInfo: string | null;
  fields: AccountRequirementsField[];
}

export interface AccountRequirementsField {
  name: string;
  group: Group[];
}

export interface Group {
  key: string;
  name: string;
  type: "radio" | "select" | "text";
  refreshRequirementsOnChange: boolean;
  required: boolean;
  displayFormat: null;
  example: string;
  minLength: number | null;
  maxLength: number | null;
  validationRegexp: string | null;
  validationAsync: ValidationAsync | null;
  valuesAllowed: ValuesAllowed[] | null;
}

interface ValidationAsync {
  url: string;
  params: Param[];
}

interface Param {
  key: string;
  parameterName: string;
  required: boolean;
}

interface ValuesAllowed {
  key: string;
  name: string;
}

export type CreateRecipientRequest = {
  currency: string;
  type: string;
  accountHolderName: string;
  details: Record<string, any>;
};

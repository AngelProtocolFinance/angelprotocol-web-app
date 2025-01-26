import type { TaxDeductibleDocs } from "@better-giving/registration/models";
export {
  taxDeductibleDocs as schema,
  type TaxDeductibleDocs as FV,
} from "@better-giving/registration/models";

export type Props = {
  doc: TaxDeductibleDocs | undefined;
};

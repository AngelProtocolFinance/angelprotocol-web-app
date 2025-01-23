import {
  type TaxDeductibleDocs,
  taxDeductibleDocs,
} from "@better-giving/registration/models";
import { type InferOutput, omit } from "valibot";

export const schema = omit(taxDeductibleDocs, ["claim", "ein"]);

export interface FormValues extends InferOutput<typeof taxDeductibleDocs> {}

export type Props = {
  doc: TaxDeductibleDocs | undefined;
};

import {
  type TaxDeductibleDocs,
  taxDeductibleDocs,
} from "@better-giving/registration/models";
import { type InferOutput, omit } from "valibot";

export const schema = omit(taxDeductibleDocs, ["claim", "outdated"]);

export interface FormValues extends InferOutput<typeof schema> {}

export type Props = {
  doc: TaxDeductibleDocs | undefined;
};

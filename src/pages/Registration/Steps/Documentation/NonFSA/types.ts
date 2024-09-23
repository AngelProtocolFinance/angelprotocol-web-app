import type { TaxDeductibleDocs } from "@better-giving/registration/models";
import type { Except } from "type-fest";

export type FormValues = Except<TaxDeductibleDocs, "claim" | "outdated">;

export type Props = {
  doc: TaxDeductibleDocs | undefined;
};

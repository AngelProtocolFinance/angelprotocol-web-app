import type { Except } from "type-fest";
import type { RegV2 } from "types/aws";

export type FormValues = Except<RegV2.TaxDeductibleDocs, "claim" | "outdated">;

export type Props = {
  doc: RegV2.TaxDeductibleDocs | undefined;
};

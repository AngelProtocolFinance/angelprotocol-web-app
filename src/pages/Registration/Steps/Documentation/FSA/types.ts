import { Except, OverrideProperties } from "type-fest";
import { FSADocumentation } from "types/aws";
import type { FileDropzoneAsset } from "types/components";

export type FormValues = OverrideProperties<
  Except<
    FSADocumentation,
    | "DocType"
    | "FiscalSponsorshipAgreementSigningURL"
    | "SignedFiscalSponsorshipAgreement"
  >,
  {
    ProofOfIdentity: FileDropzoneAsset;
    ProofOfRegistration: FileDropzoneAsset;
  }
>;

export type Props = {
  doc: FSADocumentation | undefined;
};

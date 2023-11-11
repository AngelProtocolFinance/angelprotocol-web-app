import { Except, OverrideProperties } from "type-fest";
import { FSADocumentation } from "types/aws";
import type { Asset } from "components/registration";

export type FormValues = OverrideProperties<
  Except<
    FSADocumentation,
    | "DocType"
    | "FiscalSponsorshipAgreementSigningURL"
    | "SignedFiscalSponsorshipAgreement"
  >,
  {
    ProofOfIdentity: Asset;
    ProofOfRegistration: Asset;
  }
>;

export type Props = {
  doc: FSADocumentation | undefined;
};

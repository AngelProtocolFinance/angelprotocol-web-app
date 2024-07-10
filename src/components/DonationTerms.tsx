import { APP_NAME } from "constants/env";
import { PRIVACY_POLICY, TERMS_OF_USE_DONOR } from "constants/urls";
import type ExtLink from "./ExtLink";

interface Props {
  classes?: string;
  endowName: string;
  Link: typeof ExtLink;
}
export function DonationTerms({ classes = "", endowName, Link: A }: Props) {
  return (
    <p className={classes}>
      By making a donation to {APP_NAME}, you agree to our{" "}
      <A href={TERMS_OF_USE_DONOR}>Terms of Service</A>,{" "}
      <A href={PRIVACY_POLICY}>Privacy Policy</A>. 100% of your donation is
      tax-deductible to the extent allowed by US law. Your donation is made to{" "}
      {APP_NAME}, a tax-exempt US 501(c)(3) charity that grants unrestricted
      funds to {endowName} on your behalf. As a legal matter, {APP_NAME} must
      provide any donations to {endowName} on an unrestricted basis, regardless
      of any designations or restrictions made by you.{" "}
      <A href={TERMS_OF_USE_DONOR}>See Terms.</A>
    </p>
  );
}

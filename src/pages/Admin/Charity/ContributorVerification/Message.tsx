import { VerificationRequired } from "./types";
import { PAYMENT_WORDS, titleCase } from "constants/env";

type Props = { verificationRequired: VerificationRequired };

export default function Message({ verificationRequired }: Props) {
  return verificationRequired === "yes" ? (
    <span>
      {titleCase(PAYMENT_WORDS.payer)}s <b>aren't</b> able to donate
      anonymously. {titleCase(PAYMENT_WORDS.payer)}
      verification <b>is</b> enforced.
    </span>
  ) : (
    <span>
      {titleCase(PAYMENT_WORDS.payer)}s <b>are</b> able to donate anonymously.{" "}
      {titleCase(PAYMENT_WORDS.payer)}
      verification <b>is not</b> enforced.
    </span>
  );
}

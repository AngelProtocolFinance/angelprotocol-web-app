import { VerificationRequired } from "./types";
import { PAYMENT_WORDS, titleCase } from "constants/env";

type Props = { verificationRequired: VerificationRequired };

export default function Message({ verificationRequired }: Props) {
  const not = verificationRequired === "yes" ? "" : "not";
  return (
    <span>
      {titleCase(PAYMENT_WORDS.payer)}s <b>are {not}</b> able to donate
      anonymously. {titleCase(PAYMENT_WORDS.payer)} verification <b>is {not}</b>{" "}
      enforced.
    </span>
  );
}

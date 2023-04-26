import { VerificationRequired } from "./types";

type Props = { verificationRequired: VerificationRequired };

export default function Message({ verificationRequired }: Props) {
  return verificationRequired === "yes" ? (
    <span>
      Contributors <b>aren't</b> able to donate anonymously. Contributor
      verification <b>is</b> enforced.
    </span>
  ) : (
    <span>
      Contributors <b>are</b> able to donate anonymously. Contributor
      verification <b>is not</b> enforced.
    </span>
  );
}

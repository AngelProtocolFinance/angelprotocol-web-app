import { VerificationRequired } from "./types";

type Props = { verification_required: VerificationRequired };

export default function Message({ verification_required }: Props) {
  return verification_required === "yes" ? (
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

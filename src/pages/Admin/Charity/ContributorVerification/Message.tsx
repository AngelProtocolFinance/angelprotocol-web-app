import { FormValues } from "./schema";

export default function Message({
  verification_required,
}: {
  verification_required: FormValues["contributor_verification_required"];
}) {
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

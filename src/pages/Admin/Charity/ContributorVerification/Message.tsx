import { FormValues } from "./schema";

export default function Message({
  value,
}: {
  value: FormValues["contributor_verification_required"];
}) {
  return value ? (
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

import Checkbox from "components/Checkbox";
import { PRIVACY_POLICY } from "constants/urls";

export default function PrivacyPolicyCheckbox() {
  return (
    <Checkbox name="hasAgreedToTerms">
      By checking this box, you declare that you have read and agreed to our{" "}
      <a
        href={PRIVACY_POLICY}
        target="_blank"
        rel="noreferrer noopener"
        className="underline text-blue"
      >
        Privacy Policy
      </a>
    </Checkbox>
  );
}

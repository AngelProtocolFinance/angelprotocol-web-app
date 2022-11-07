import { DocumentationValues } from "pages/Registration/types";
import Checkbox from "components/Checkbox";
import { PRIVACY_POLICY } from "constants/urls";

export default function PrivacyPolicyCheckbox() {
  return (
    <Checkbox<DocumentationValues> name="checkedPolicy">
      By checking this box, you declare that you have read and agreed to our{" "}
      <a
        href={PRIVACY_POLICY}
        target="_blank"
        rel="noreferrer noopener"
        className="underline text-blue"
      >
        Privacy Policy
      </a>
      <span className="text-red ml-0.5">*</span>
    </Checkbox>
  );
}

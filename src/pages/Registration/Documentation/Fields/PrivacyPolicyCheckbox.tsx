import { DocumentationValues } from "pages/Registration/types";
import Checkbox from "components/Checkbox";
import ExtLink from "components/ExtLink";
import { PRIVACY_POLICY } from "constants/urls";

export default function PrivacyPolicyCheckbox() {
  return (
    <Checkbox<DocumentationValues> name="checkedPolicy" required>
      By checking this box, you declare that you have read and agreed to our{" "}
      <ExtLink href={PRIVACY_POLICY} className="underline text-blue">
        Privacy Policy
      </ExtLink>
    </Checkbox>
  );
}

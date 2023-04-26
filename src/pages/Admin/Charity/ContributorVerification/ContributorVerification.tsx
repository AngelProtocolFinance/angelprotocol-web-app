import { useState } from "react";
import { VerificationRequired } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import ChangeSettingsPrompt from "./ChangeSettingsPrompt";
import Message from "./Message";

export default function ContributorVerification() {
  const { contributor_verification_required } = useAdminResources<"charity">();

  const originalValue = contributor_verification_required ? "yes" : "no";

  const [verificationRequired, setVerificationRequired] =
    useState<VerificationRequired>(originalValue);

  const { showModal } = useModalContext();

  const handleChange = () =>
    showModal(ChangeSettingsPrompt, {
      currentValue: verificationRequired,
      onChange: (value) => setVerificationRequired(value),
    });

  return (
    <form
      className="grid gap-8"
      onReset={() => setVerificationRequired(originalValue)}
      onSubmit={() => {
        console.log("submitted", verificationRequired);
      }}
    >
      <h2 className="font-bold text-3xl">Other settings</h2>
      <div className="flex flex-col items-start gap-8 p-8 border border-prim rounded dark:bg-blue-d6">
        <span className="font-bold text-2xl">Contributor Verification</span>
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 w-full px-4 py-3 border border-prim rounded bg-gray-l6 dark:bg-blue-d5">
          <Message verificationRequired={verificationRequired} />
          <button
            type="button"
            className="btn-outline-filled w-full md:w-32 h-10 text-sm"
            onClick={handleChange}
          >
            Change
          </button>
        </div>
        <div className="flex justify-start gap-3 w-full">
          <button
            type="reset"
            className="btn-outline-gray grow max-w-[11rem] h-12 text-sm"
          >
            Reset
          </button>
          <button type="submit" className="btn-outline-gray w-44 h-12 text-sm">
            Submit changes
          </button>
        </div>
      </div>
    </form>
  );
}

import { useState } from "react";
import { VerificationRequired } from "./types";
import { Profile } from "services/types";
import { useProfileQuery } from "services/aws/aws";
import { useModalContext } from "contexts/ModalContext";
import QueryLoader from "components/QueryLoader";
import { PAYMENT_WORDS, titleCase } from "constants/common";
import { adminRoutes } from "constants/routes";
import { useAdminResources } from "../../../Guard";
import Seo from "../../Seo";
import useUpdateEndowmentProfile from "../../common/useUpdateEndowmentProfile";
import { Reset, Submit } from "../common/Btn";
import { SubHeading } from "../common/SubHeading";
import Message from "./Message";
import ChangeSettingsPrompt from "./Prompt";

export default function DonorVerification() {
  const { id } = useAdminResources<"charity">();
  const queryState = useProfileQuery(id, { skip: id === 0 });

  return (
    <>
      <Seo title="Other settings" url={adminRoutes.other_settings} />

      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Getting endowment info..",
          error: "Failed to get endowment info",
        }}
        classes={{ container: "text-center mt-8" }}
      >
        {(profile) => <Content profile={profile} />}
      </QueryLoader>
    </>
  );
}

function Content({ profile }: { profile: Profile }) {
  const originalValue: VerificationRequired =
    profile.contributor_verification_required ? "yes" : "no";

  const { id, owner } = useAdminResources<"charity">();

  const [verificationRequired, setVerificationRequired] =
    useState(originalValue);

  const { showModal } = useModalContext();

  const updateProfile = useUpdateEndowmentProfile();

  const handleChange = () =>
    showModal(ChangeSettingsPrompt, {
      currentValue: verificationRequired,
      onChange: (value) => setVerificationRequired(value),
    });

  return (
    <form
      className="grid content-start gap-8 p-8 border border-prim rounded dark:bg-blue-d6"
      onReset={() => setVerificationRequired(originalValue)}
      onSubmit={(e) => {
        e.preventDefault();
        updateProfile({
          id,
          owner,
          contributor_verification_required: verificationRequired === "yes",
        });
      }}
    >
      <SubHeading>{titleCase(PAYMENT_WORDS.payer)} Verification</SubHeading>
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
        <Reset disabled={originalValue === verificationRequired}>
          Reset changes
        </Reset>
        <Submit>Submit changes</Submit>
      </div>
    </form>
  );
}

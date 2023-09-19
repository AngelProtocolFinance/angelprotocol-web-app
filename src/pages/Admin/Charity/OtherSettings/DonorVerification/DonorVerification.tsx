import { useState } from "react";
import { VerificationRequired } from "./types";
import { Profile } from "services/types";
import { useProfileQuery } from "services/aws/aws";
import { useModalContext } from "contexts/ModalContext";
import QueryLoader from "components/QueryLoader";
import { Reset, Submit, Tooltip } from "components/admin";
import { PAYMENT_WORDS, titleCase } from "constant/common";
import { adminRoutes } from "constant/routes";
import { isTooltip, useAdminContext } from "../../../Context";
import Seo from "../../Seo";
import useUpdateEndowmentProfile from "../../common/useUpdateEndowmentProfile";
import { Form as Frm } from "../common/Form";
import { SubHeading } from "../common/SubHeading";
import Message from "./Message";
import ChangeSettingsPrompt from "./Prompt";

export default function DonorVerification() {
  const { id } = useAdminContext<"charity">();
  const queryState = useProfileQuery({ endowId: id }, { skip: id === 0 });

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

  const { id, owner, txResource } = useAdminContext<"charity">([
    "name",
    "image",
    "logo",
    "sdgs",
  ]);

  const [verificationRequired, setVerificationRequired] =
    useState(originalValue);

  const { showModal } = useModalContext();

  const updateProfile = useUpdateEndowmentProfile();

  const handleChange = () =>
    showModal(ChangeSettingsPrompt, {
      currentValue: verificationRequired,
      onChange: (value) => setVerificationRequired(value),
    });

  const tooltip = isTooltip(txResource) ? txResource : undefined;
  return (
    <Frm
      onReset={() => setVerificationRequired(originalValue)}
      onSubmit={(e) => {
        e.preventDefault();
        updateProfile({
          id,
          owner,
          contributor_verification_required: verificationRequired === "yes",
        });
      }}
      aria-disabled={!!tooltip}
    >
      <SubHeading>{titleCase(PAYMENT_WORDS.payer)} Verification</SubHeading>
      {tooltip && <Tooltip tooltip={tooltip} />}
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 w-full px-4 py-3 border border-gray-l3 dark:border-bluegray rounded bg-gray-l6 dark:bg-blue-d5">
        <Message verificationRequired={verificationRequired} />
        <button
          type="button"
          className="btn-outline-filled w-full md:w-32 h-10 text-sm"
          onClick={handleChange}
        >
          Change
        </button>
      </div>
      {!tooltip && (
        <div className="flex justify-start gap-3 w-full">
          <Reset disabled={originalValue === verificationRequired}>
            Reset changes
          </Reset>
          <Submit>Submit changes</Submit>
        </div>
      )}
    </Frm>
  );
}

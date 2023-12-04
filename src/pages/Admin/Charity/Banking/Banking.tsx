import { useEffect, useState } from "react";
import { CreateRecipientRequest } from "types/aws";
import { FileDropzoneAsset } from "types/components";
import { useAdminContext } from "pages/Admin/Context";
import {
  useProfileQuery,
  useUpdateBankStatementMutation,
} from "services/aws/aws";
import { useCreateRecipientAccountMutation } from "services/aws/bankDetails";
import { useErrorContext } from "contexts/ErrorContext";
import BankDetails from "components/BankDetails";
import Group from "components/Group";
import LoaderRing from "components/LoaderRing";
import { getFilePreviews } from "helpers";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { EMAIL_SUPPORT } from "constants/env";
import FormButtons from "./FormButtons";
import VerificationStatus from "./VerificationStatus";

const PROFILE_ERROR = `Error loading profile. Please try again later. If the error persists,
please contact ${EMAIL_SUPPORT}.`;

export default function Banking() {
  const { id: endowment_id } = useAdminContext();

  const [isSubmitting, setSubmitting] = useState(false);

  const [createRecipientAccount] = useCreateRecipientAccountMutation();
  const [updateBankStatement] = useUpdateBankStatementMutation();

  // load profile
  const { id } = useAdminContext();
  const {
    data: profile,
    isLoading: isLoadingProfile,
    isError: isProfileError,
    error,
  } = useProfileQuery({ endowId: id });

  const { handleError } = useErrorContext();

  useEffect(() => {
    if (error) {
      handleError(error, PROFILE_ERROR);
    }
  }, [error, handleError]);

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center gap-2">
        <LoaderRing thickness={10} classes="w-6" /> Loading...
      </div>
    );
  }

  if (isProfileError || !profile) {
    return null;
  }

  const verif_status = profile.bank_verification_status;

  const isSubmitted = verif_status !== "Not Submitted";

  const submit = async (
    request: CreateRecipientRequest,
    bankStatementFile: FileDropzoneAsset
  ) => {
    try {
      setSubmitting(true);

      const bankStatementPreview = await getFilePreviews({
        bankStatementFile,
      });

      await updateBankStatement({
        id: profile.id,
        bank_statement_file: bankStatementPreview.bankStatementFile[0],
      }).unwrap();

      await createRecipientAccount({
        endowmentId: endowment_id,
        request,
      }).unwrap();
    } catch (error) {
      handleError(error, GENERIC_ERROR_MESSAGE);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Group
      className="max-w-4xl"
      title="Bank account details"
      description="The following information will be used to register your bank account that will be used to withdraw your funds."
    >
      <VerificationStatus status={verif_status} />
      <BankDetails
        alreadySubmitted={isSubmitted}
        isSubmitting={isSubmitting}
        onSubmit={submit}
        FormButtons={FormButtons}
      />
    </Group>
  );
}

import { useEffect } from "react";
import { useAdminContext } from "pages/Admin/Context";
import { useProfileQuery } from "services/aws/aws";
import { useCreateRecipientAccountMutation } from "services/aws/bankDetails";
import { useErrorContext } from "contexts/ErrorContext";
import BankDetails from "components/BankDetails";
import LoaderRing from "components/LoaderRing";
import { getFilePreviews } from "helpers";
import { EMAIL_SUPPORT } from "constants/env";
import { Group } from "../common";
import FormButtons from "./FormButtons";
import VerificationStatus from "./VerificationStatus";

const PROFILE_ERROR = `Error loading profile. Please try again later. If the error persists,
please contact ${EMAIL_SUPPORT}.`;

export default function Banking() {
  const { id: endowment_id } = useAdminContext();

  const [createRecipientAccount] = useCreateRecipientAccountMutation();

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

  return (
    <div className="grid">
      <div className="grid gap-5 max-w-4xl justify-self-center">
        <Group
          title="Bank account details"
          description="The following information will be used to register your bank account that will be used to withdraw your funds."
        >
          <VerificationStatus status={verif_status} />
          <BankDetails
            disabled={isSubmitted}
            onSubmit={async (request, bankStatementFile) => {
              const bankStatementPreview = await getFilePreviews({
                bankStatementFile,
              });
              // TODO: logging just to avoid compiler warnings about unused variable,
              // will be updated to real logic once possible
              console.log(
                `TODO: handle bank statement: ${bankStatementPreview.bankStatementFile[0].publicUrl}`
              );
              await createRecipientAccount({
                PK: endowment_id,
                request,
              }).unwrap();
            }}
          >
            {(disabled, isSubmitting, refreshRequired) => (
              <FormButtons
                disabled={disabled}
                isSubmitting={isSubmitting}
                refreshRequired={refreshRequired}
              />
            )}
          </BankDetails>
        </Group>
      </div>
    </div>
  );
}

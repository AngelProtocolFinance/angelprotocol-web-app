import { SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormValues as FV } from "../types";
import { useUpdateRegMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { handleMutationResult } from "helpers";
import { useRegState } from "../../StepGuard";

export default function useSubmit() {
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<FV>();
  const {
    step,
    data: { init, contact },
  } = useRegState<1>();

  const [updateReg] = useUpdateRegMutation();
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  const submit: SubmitHandler<FV> = async (fv) => {
    if (!isDirty && contact) {
      return navigate(`../${step}`, { state: init }); // go to latest step
    }

    handleMutationResult(
      await updateReg({
        type: "contact-details",
        reference: fv.PK,
        ContactPerson: {
          FirstName: fv.FirstName,
          LastName: fv.LastName,
          Email: fv.Email,
          Goals: fv.Goals,
          PhoneNumber: fv.PhoneNumber,
          ReferralMethod: fv.ReferralMethod.value,
          OtherReferralMethod: fv.OtherReferralMethod,
          ReferralCode: fv.ReferralCode,
          Role: fv.Role.value,
          OtherRole: fv.OtherRole,
        },
        Registration: {
          OrganizationName: fv.OrganizationName,
        },
      }),
      handleError
    );
  };

  return { submit: handleSubmit(submit), isSubmitting };
}

import { SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormValues as FV } from "../types";
import { ContactRoles, ReferralMethods } from "types/aws";
import { useUpdateRegMutation } from "services/aws/registration";
import { useRegState } from "services/aws/registration/StepGuard";
import { useErrorContext } from "contexts/ErrorContext";
import { handleMutationResult } from "helpers";

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
      navigate(`../${step}`, { state: init }); // go to latest step
    }

    handleMutationResult(
      await updateReg({
        type: "contact details",
        reference: fv.ref,
        ContactPerson: {
          FirstName: fv.firstName,
          LastName: fv.lastName,
          Email: fv.email,
          Goals: fv.goals,
          PhoneNumber: fv.phone,
          ReferralMethod: fv.referralMethod as ReferralMethods,
          Role: fv.role as ContactRoles,
        },
        Registration: {
          OrganizationName: fv.orgName,
        },
      }),
      handleError
    );
  };

  return { submit: handleSubmit(submit), isSubmitting };
}

import { useUpdateRegMutation } from "@/services/aws/registration";
import { useErrorContext } from "@ap/contexts";
import { handleMutationResult } from "@ap/helpers";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormValues as FV } from "../types";
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
        type: "contact details",
        reference: fv.ref,
        ContactPerson: {
          FirstName: fv.firstName,
          LastName: fv.lastName,
          Email: fv.email,
          Goals: fv.goals,
          PhoneNumber: fv.phone,
          ReferralMethod: fv.referralMethod.value,
          OtherReferralMethod: fv.referralMethod.value,
          Role: fv.role.value,
          OtherRole: fv.otherRole,
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

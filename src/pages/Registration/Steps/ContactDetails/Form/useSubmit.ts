import { SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormValues as FV } from "../types";
import { useUpdateRegMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
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

    await updateReg({
      uuid: init.uuid,
      referralMethod: fv.referralMethod.value,
      otherReferralMethod: fv.otherReferralMethod,
      referralCode: fv.referralCode,
      orgRole: fv.orgRole.value,
      otherOrgRole: fv.otherOrgRole,
      registrantPhoneNumber: fv.registrantPhoneNumber,
      registrantGoals: fv.registrantGoals,
      registrantRole: fv.registrantRole,
    })
      .unwrap()
      .catch(handleError);
  };

  return { submit: handleSubmit(submit), isSubmitting };
}

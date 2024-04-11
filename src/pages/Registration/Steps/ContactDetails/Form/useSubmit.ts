import { useErrorContext } from "contexts/ErrorContext";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUpdateRegMutation } from "services/aws/registration";
import { steps } from "../../../routes";
import { useRegState } from "../../StepGuard";
import { FormValues as FV } from "../types";

export default function useSubmit() {
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<FV>();
  const {
    data: { init, contact },
  } = useRegState<1>();

  const [updateReg] = useUpdateRegMutation();
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  const submit: SubmitHandler<FV> = async (fv) => {
    if (!isDirty && contact) {
      return navigate(`../${steps.orgDetails}`, { state: init }); // go to latest step
    }

    const result = await updateReg({
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
    });

    if ("error" in result) {
      return handleError(result.error, { context: "updating registration" });
    }

    navigate(`../${steps.orgDetails}`, { state: init });
  };

  return {
    submit: handleSubmit(submit),
    isSubmitting,
  };
}

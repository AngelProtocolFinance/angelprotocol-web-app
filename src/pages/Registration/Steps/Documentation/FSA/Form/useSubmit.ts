import { SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormValues, Props } from "../types";
import { useUpdateRegMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { getFilePreviews } from "./getFilePreviews";

export default function useSubmit({ doc, thisStep, init }: Props) {
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<FormValues>();

  const [updateReg] = useUpdateRegMutation();
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  const submit: SubmitHandler<FormValues> = async (fv) => {
    try {
      if (!isDirty && doc) {
        return navigate(`../${thisStep}`, { state: init });
      }
      const previews = await getFilePreviews({
        POI: fv.ProofOfIdentity,
        POR: fv.ProofOfRegistration,
      });
      await updateReg({
        type: "documentation",
        DocType: "FSA",
        reference: init.reference,

        ProofOfIdentity: previews.POI[0], //poi is level1 and required
        ProofOfRegistration: previews.POR[0], //por is level1 and required,
        LegalEntityType: fv.LegalEntityType,
        ProjectDescription: fv.ProjectDescription,
      });
    } catch (err) {
      handleError(err);
    }
  };
  return {
    submit: handleSubmit(submit),
    isSubmitting,
  };
}

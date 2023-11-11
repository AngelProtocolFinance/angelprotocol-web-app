import { SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormValues, Props } from "../types";
import { useRegState } from "pages/Registration/Steps/StepGuard";
import {
  useFiscalSponsorshipAgreementSigningURLMutation,
  useUpdateRegMutation,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { steps } from "../../../../routes";
import { getFilePreviews } from "./getFilePreviews";

export default function useSubmit({ doc }: Props) {
  const {
    data: { contact, init, orgDetails },
  } = useRegState<4>();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<FormValues>();

  const [updateReg] = useUpdateRegMutation();
  const [generateSigningURL] =
    useFiscalSponsorshipAgreementSigningURLMutation();

  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  const submit: SubmitHandler<FormValues> = async (fv) => {
    try {
      //no signing URL generated yet
      if (!doc?.FiscalSponsorshipAgreementSigningURL) {
        const { url } = await generateSigningURL({
          id: init.reference,
          email: init.email,
          firstName: contact.FirstName,
          lastName: contact.LastName,
          role:
            contact.Role === "other" ? contact.OtherRole : contact.OtherRole,
          org: {
            name: contact.orgName,
            legalEntityType: fv.LegalEntityType,
            hq: orgDetails.HqCountry,
            projectDescription: fv.ProjectDescription,
          },
        }).unwrap();
        return navigate(url);
      }

      //signingURL generated but not signed
      if (
        doc.FiscalSponsorshipAgreementSigningURL &&
        !doc.SignedFiscalSponsorshipAgreement
      ) {
        return navigate(doc.FiscalSponsorshipAgreementSigningURL);
      }

      if (!isDirty && doc) {
        return navigate(`../${steps.banking}`, { state: init });
      }

      const previews = await getFilePreviews({
        POI: fv.ProofOfIdentity,
        POR: fv.ProofOfRegistration,
      });
      await updateReg({
        type: "documentation",
        DocType: "FSA",
        reference: init.reference,

        ProofOfIdentity: previews.POI[0],
        ProofOfRegistration: previews.POR[0],
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

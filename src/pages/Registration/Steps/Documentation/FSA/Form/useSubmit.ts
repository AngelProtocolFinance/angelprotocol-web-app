import { SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormValues, Props } from "../types";
import {
  useFiscalSponsorshipAgreementSigningURLMutation,
  useUpdateRegMutation,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { getFilePreviews } from "./getFilePreviews";

export default function useSubmit({
  doc,
  thisStep,
  init,
  orgCountry,
  orgName,
  contact,
}: Props) {
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
            name: orgName,
            legalEntityType: fv.LegalEntityType,
            hq: orgCountry,
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

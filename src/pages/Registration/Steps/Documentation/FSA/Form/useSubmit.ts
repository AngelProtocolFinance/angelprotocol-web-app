import { useErrorContext } from "contexts/ErrorContext";
import { getFilePreviews } from "helpers";
import { useRegState } from "pages/Registration/Steps/StepGuard";
import { useState } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFiscalSponsorshipAgreementSigningURLMutation } from "services/aws/registration";
import { steps } from "../../../../routes";
import { FormValues, Props } from "../types";

export default function useSubmit({ doc }: Props) {
  const {
    data: { contact, init, orgDetails },
  } = useRegState<4>();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<FormValues>();

  //use separate state to show redirection
  const [isRedirecting, setRedirecting] = useState(false);

  const [generateSigningURL] =
    useFiscalSponsorshipAgreementSigningURLMutation();

  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  const submit: SubmitHandler<FormValues> = async (fv) => {
    try {
      //signed agreement and user didn't change any documents
      if (!isDirty && doc?.SignedFiscalSponsorshipAgreement) {
        return navigate(`../${steps.banking}`, { state: init });
      }

      //existing url and user doesn't change any documents
      if (!isDirty && doc?.FiscalSponsorshipAgreementSigningURL) {
        setRedirecting(true);
        window.location.href = doc.FiscalSponsorshipAgreementSigningURL;
      }

      const previews = await getFilePreviews({
        POI: fv.ProofOfIdentity,
        POR: fv.ProofOfRegistration,
      });

      const { url } = await generateSigningURL({
        id: init.reference,
        email: init.email,
        firstName: contact.FirstName,
        lastName: contact.LastName,
        role: contact.Role === "other" ? contact.OtherRole : contact.Role,
        docs: {
          OrgName: contact.orgName,
          HqCountry: orgDetails.HqCountry,
          RegistrationNumber: fv.RegistrationNumber,
          ProofOfIdentity: previews.POI[0],
          ProofOfRegistration: previews.POR[0],
          LegalEntityType: fv.LegalEntityType,
          ProjectDescription: fv.ProjectDescription,
        },
      }).unwrap();
      setRedirecting(true);
      window.location.href = url;
    } catch (err) {
      handleError(err);
    }
  };
  return {
    submit: handleSubmit(submit),
    isSubmitting,
    isRedirecting,
  };
}

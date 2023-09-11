import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { useRegState, withStepGuard } from "../StepGuard";
import { genFileAsset } from "../getRegistrationState";
import Form from "./Form";
import { schema } from "./schema";

function Documentation() {
  const {
    data: { documentation: doc },
  } = useRegState<2>();

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: doc
      ? {
          ...(({ tier, ...doc }) => doc)(doc),
        }
      : {
          ein: "",
          proofOfIdentity: genFileAsset([]),
          proofOfRegistration: genFileAsset([]),
          website: "",

          sdgs: [],
          cashEligible: false,
          hqCountry: { name: "", flag: "", code: "" },
          endowDesignation: { value: "", label: "" },
          activeInCountries: [],
          isAuthorizedToReceiveTaxDeductibleDonations: "Yes",
          signedFiscalSponsorshipAgreement: "",
          fiscalSponsorshipAgreementSigningURL: "",

          hasAuthority: false,
          hasAgreedToTerms: false,
          isAnonymousDonationsAllowed: "Yes",
        },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}

export default withStepGuard(Documentation);

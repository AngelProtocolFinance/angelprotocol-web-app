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
          ...(({ level, activeInCountries, hqCountry, ...doc }) => ({
            ...doc,
            hqCountry: { name: hqCountry, flag: "" },
            activeInCountriesOpts: activeInCountries.map((countryName) => ({
              label: countryName,
              value: countryName,
            })),
          }))(doc),
        }
      : {
          proofOfIdentity: genFileAsset([]),
          proofOfRegistration: genFileAsset([]),
          financialStatements: genFileAsset([]),
          auditedFinancialReports: genFileAsset([]),
          website: "",
          hasAuthority: false,
          hasAgreedToTerms: false,
          isKYCRequired: "No",
          sdgs: [],
          hqCountry: { name: "", flag: "" },
          activeInCountriesOpts: [],
        },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}

export default withStepGuard(Documentation);

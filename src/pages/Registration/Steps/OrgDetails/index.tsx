import { yupResolver } from "@hookform/resolvers/yup";
import { country } from "components/CountrySelector";
import { unsdgs } from "constants/unsdgs";
import { FormProvider, useForm } from "react-hook-form";
import { OrgDetails as TOrgDetails } from "types/aws";
import { useRegState, withStepGuard } from "../StepGuard";
import Form from "./Form";
import { schema } from "./schema";
import { FormValues } from "./types";

function OrgDetails() {
  const {
    data: { orgDetails: org, init },
  } = useRegState<2>();

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: org
      ? formFomat(org)
      : {
          Website: "",
          UN_SDG: [],
          HqCountry: init.claim
            ? /** all unclaimed endowments are US-based */
              { name: "United States", flag: "🇺🇸", code: "US" }
            : { name: "", flag: "", code: "" },
          EndowDesignation: { value: "", label: "" },
          ActiveInCountries: [],
          isAnonymousDonationsAllowed: "Yes",
        },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}

export default withStepGuard(OrgDetails);

function formFomat(org: TOrgDetails): FormValues {
  return {
    //level 1
    Website: org.Website,
    UN_SDG: org.UN_SDG.map((sdg) => ({
      value: sdg,
      label: `${sdg} - ${unsdgs[sdg].title}`,
    })),
    HqCountry: country(org.HqCountry),
    EndowDesignation: {
      value: org.EndowDesignation,
      label: org.EndowDesignation,
    },
    //general
    ActiveInCountries: org.ActiveInCountries.map((c) => ({
      label: c,
      value: c,
    })),

    //meta
    isAnonymousDonationsAllowed: org.KycDonorsOnly ? "No" : "Yes",
  };
}

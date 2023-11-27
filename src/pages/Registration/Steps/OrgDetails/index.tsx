import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { OrgDetails as TOrgDetails } from "types/aws";
import { country } from "components/CountrySelector";
import { unsdgs } from "constant/unsdgs";
import { useRegState, withStepGuard } from "../StepGuard";
import Form from "./Form";
import { schema } from "./schema";

function OrgDetails() {
  const {
    data: { orgDetails: org },
  } = useRegState<2>();

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: org
      ? formFomat(org)
      : {
          Website: "",
          UN_SDG: [],
          HqCountry: { name: "", flag: "", code: "" },
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

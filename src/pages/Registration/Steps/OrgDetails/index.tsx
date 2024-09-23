import { yupResolver } from "@hookform/resolvers/yup";
import { country } from "components/CountrySelector";
import { unsdgs } from "constants/unsdgs";
import { FormProvider, useForm } from "react-hook-form";
import type { RegV2 } from "types/aws";
import { useRegState, withStepGuard } from "../StepGuard";
import Form from "./Form";
import { schema } from "./schema";
import type { FormValues } from "./types";

function OrgDetails() {
  const {
    data: { org, init },
  } = useRegState<2>();

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: org
      ? formFomat(org)
      : {
          website: "",
          un_sdg: [],
          hq_country: init.claim
            ? /** all unclaimed endowments are US-based */
              { name: "United States", flag: "🇺🇸", code: "US" }
            : { name: "", flag: "", code: "" },
          designation: { value: "", label: "" },
          active_in_countries: [],
          isAnonymousDonationsAllowed: "yes",
        },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}

export default withStepGuard(OrgDetails);

function formFomat(org: RegV2.Org): FormValues {
  return {
    //level 1
    website: org.website,
    un_sdg: org.un_sdg.map((sdg) => ({
      value: sdg,
      label: `${sdg} - ${unsdgs[sdg].title}`,
    })),
    hq_country: country(org.hq_country),
    designation: {
      value: org.designation,
      label: org.designation,
    },
    //general
    active_in_countries: (org.active_in_countries || []).map((c) => ({
      label: c,
      value: c,
    })),

    //meta
    isAnonymousDonationsAllowed: org.kyc_donors_only ? "no" : "yes",
  };
}

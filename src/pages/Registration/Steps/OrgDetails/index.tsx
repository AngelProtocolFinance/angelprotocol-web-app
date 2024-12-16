import type { Org } from "@better-giving/registration/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { country } from "components/CountrySelector";
import { unsdgs } from "constants/unsdgs";
import { FormProvider, useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import type { RegStep2 } from "../../types";
import Form from "./Form";
import { schema } from "./schema";
import type { FormValues } from "./types";

export default function OrgDetails() {
  const state = useLoaderData() as RegStep2;
  const {
    data: { init, org },
  } = state;

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
      <Form {...state} />
    </FormProvider>
  );
}

function formFomat(org: Org): FormValues {
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

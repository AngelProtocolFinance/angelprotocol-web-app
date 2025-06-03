import { orgDesignations } from "@better-giving/schemas";
import { NavLink } from "@remix-run/react";
import countries from "assets/countries/all.json";
import ActivityCountries from "components/activity-countries";
import CountrySelector from "components/country-selector";
import ExtLink from "components/ext-link";
import { Field, Label } from "components/form";
import { LoadText } from "components/load-text";
import { Selector } from "components/selector";
import { TERMS_OF_USE_NPO } from "constants/urls";
import { steps } from "../../../routes";
import type { RegStep2 } from "../../../types";
import type { FormValues as FV } from "../types";
import useSubmit from "./use-submit";

export default function Form({ data }: RegStep2) {
  const { submit, isSubmitting } = useSubmit(data.org);

  return (
    <form className="w-full" onSubmit={submit}>
      <h2 className="text-center sm:text-left text-xl mb-2">
        Organization Details
      </h2>

      <Field<FV>
        name="website"
        label="Website of your organization"
        required
        classes={{ container: "mb-6 mt-4" }}
        placeholder="e.g. https://www.example.com"
      />

      <Selector<FV, "designation", string>
        required
        label="Nonprofit Designation"
        name="designation"
        classes={{ options: "text-sm", container: "mt-4" }}
        options={orgDesignations.map((v) => ({
          label: v,
          value: v,
        }))}
      />

      <CountrySelector<FV, "hq_country">
        required
        label="In what country is your organization registered in?"
        //endowment claims are US-based and shoudn't be changed by claimer
        disabled={!!data.init.claim}
        fieldName="hq_country"
        placeholder="Select a country"
        classes={{
          container: "mt-6 mb-2",
        }}
        options={countries}
      />

      <Label className="mt-6 mb-2">
        Select the countries your organization is active in
      </Label>
      <ActivityCountries<FV, "active_in_countries">
        name="active_in_countries"
        classes={{ options: "text-sm" }}
      />

      <p className="text-sm">
        By submitting this information, you declare that you have read and
        agreed to our{" "}
        <ExtLink
          className="underline text-blue-d1 hover:text-blue"
          href={TERMS_OF_USE_NPO}
        >
          Terms & Conditions
        </ExtLink>
        .
      </p>
      <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
        <NavLink
          aria-disabled={isSubmitting}
          to={`../${steps.contact}`}
          className="py-3 min-w-[8rem] btn btn-outline text-sm"
        >
          Back
        </NavLink>
        <button
          disabled={isSubmitting}
          type="submit"
          className="py-3 min-w-[8rem] btn btn-blue text-sm"
        >
          <LoadText isLoading={isSubmitting}>Continue</LoadText>
        </button>
      </div>
    </form>
  );
}

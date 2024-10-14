import { endowDesignations } from "@better-giving/registration/models";
import countries from "assets/countries/all.json";
import ActivityCountries from "components/ActivityCountries";
import CountrySelector from "components/CountrySelector";
import ExtLink from "components/ExtLink";
import LoadText from "components/LoadText";
import { MultiSelector, Selector } from "components/Selector";
import { Field, Label, Radio } from "components/form";
import { unsdgs } from "constants/unsdgs";
import { TERMS_OF_USE_NPO } from "constants/urls";
import { Link } from "react-router-dom";
import { steps } from "../../../routes";
import { useRegState } from "../../StepGuard";
import type { FormValues as FV } from "../types";
import useSubmit from "./useSubmit";

export default function Form() {
  const { data } = useRegState<2>();
  const { submit, isSubmitting } = useSubmit();

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

      <Label className="mb-2 mt-6" required>
        Select the Sustainable Development Goals your organization is the most
        aligned with
      </Label>
      <MultiSelector<FV, "un_sdg", number>
        name="un_sdg"
        options={sdgOptions}
        classes={{ options: "text-sm" }}
      />
      <Label className="mb-2 mt-6" required>
        Nonprofit Designation
      </Label>
      <Selector<FV, "designation", string>
        name="designation"
        classes={{ options: "text-sm" }}
        options={endowDesignations.map((designation) => ({
          label: designation,
          value: designation,
        }))}
      />
      <Label className="mt-6 mb-2" required>
        In what country is your organization registered in?
      </Label>
      <CountrySelector<FV, "hq_country">
        //endowment claims are US-based and shoudn't be changed by claimer
        disabled={!!data.init.claim}
        fieldName="hq_country"
        placeholder="Select a country"
        classes={{
          container: "px-4",
          input: "text-sm py-3.5",
          error: "field-error",
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

      <Label className="mt-6">
        Are you happy to accept anonymous donations? If not, ALL donors will be
        required to provide a name and address.
      </Label>
      <div className="flex gap-4 mt-4 accent-blue-d1 text-sm">
        <Radio<FV, "isAnonymousDonationsAllowed">
          name="isAnonymousDonationsAllowed"
          value="yes"
        />
        <Radio<FV, "isAnonymousDonationsAllowed">
          name="isAnonymousDonationsAllowed"
          value="no"
        />
      </div>

      <Separator classes="my-8" />

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
        <Link
          aria-disabled={isSubmitting}
          to={`../${steps.contact}`}
          state={data.init}
          className="py-3 min-w-[8rem] btn-outline-filled btn-reg"
        >
          Back
        </Link>
        <button
          disabled={isSubmitting}
          type="submit"
          className="py-3 min-w-[8rem] btn-blue btn-reg"
        >
          <LoadText isLoading={isSubmitting}>Continue</LoadText>
        </button>
      </div>
    </form>
  );
}

const Separator = ({ classes = "" }: { classes?: string }) => (
  <div className={`${classes} h-px w-full bg-gray-l3 dark:bg-navy`} />
);

const sdgOptions = Object.entries(unsdgs).map(([key, { title }]) => ({
  value: +key,
  label: `${key} - ${title}`,
}));

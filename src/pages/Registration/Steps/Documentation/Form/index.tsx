import { Link } from "react-router-dom";
import { FormValues as FV } from "../types";
import { EndowDesignation } from "types/aws";
import countries from "assets/countries/all.json";
import ActivityCountries from "components/ActivityCountries";
import CountrySelector from "components/CountrySelector";
import ExtLink from "components/ExtLink";
import { MultiSelector, Selector } from "components/Selector";
import { Field, Label, Radio } from "components/form";
import { FileDropzone, LoadText } from "components/registration";
import { MB_LIMIT } from "schemas/file";
import { unsdgs } from "constants/unsdgs";
import { TERMS_OF_USE_NPO } from "constants/urls";
import { steps } from "../../../routes";
import { useRegState } from "../../StepGuard";
// import { CashEligibleCheckbox } from "./CashEligibleCheckbox";
import useSubmit from "./useSubmit";

const endowDesignations: EndowDesignation[] = [
  "Charity",
  "Religious Organization",
  "University",
  "Hospital",
  "Other",
];

export default function Form() {
  const { data } = useRegState<2>();
  const { submit, isSubmitting, isAuthorizedToReceiveTaxDeductibleDonations } =
    useSubmit();

  return (
    <form className="w-full" onSubmit={submit}>
      <h2 className="text-center sm:text-left text-xl mb-2">Documentation</h2>
      <p className="mt-2 text-sm">
        This information will be kept private and will be used to validate you
        are an authorized representative of{" "}
        <span className="font-semibold">{data.contact.orgName}</span> whose
        organization is registered and in good standing.
      </p>
      <h4 className="text-center sm:text-left text-lg mt-8">
        Government issued ID
      </h4>
      <Label required className="mb-2 mt-1">
        Please provide passport, driver's license, or ID card.
      </Label>
      <FileDropzone<FV, "proofOfIdentity">
        name="proofOfIdentity"
        tooltip={fileTooltip}
      />

      <h2 className="text-center sm:text-left text-lg mt-8">
        Organizational Details
      </h2>
      <Field<FV>
        name="website"
        label="Website of your organization"
        required
        classes={{ container: "mb-6 mt-2" }}
        placeholder="e.g. https://www.example.com"
      />
      <Field<FV>
        name="ein"
        label="EIN# (or equivalent non-US charity/nonprofit registration number)"
        required
        classes={{ container: "mb-6 mt-1" }}
        placeholder="e.g. xx-xxxxxxxxxx"
      />
      <Label className="mb-2" required>
        Proof of registration as a 501(C)(3) nonprofit or equivalent
      </Label>
      <FileDropzone<FV, "proofOfRegistration">
        name="proofOfRegistration"
        tooltip={fileTooltip}
      />
      <Label className="mb-2 mt-6" required>
        Select the Sustainable Development Goals your organization is the most
        aligned with
      </Label>
      <MultiSelector<FV, "sdgs", number> name="sdgs" options={sdgOptions} />
      <Label className="mb-2 mt-6" required>
        Endowment Designation
      </Label>
      <Selector<FV, "endowDesignation", string>
        name="endowDesignation"
        options={endowDesignations.map((designation) => ({
          label: designation,
          value: designation,
        }))}
      />
      <Label className="mt-6 mb-2" required>
        In what country is your organization registered in?
      </Label>
      <CountrySelector<FV, "hqCountry">
        fieldName="hqCountry"
        placeholder="Select a country"
        countries={countries}
        classes={{
          container: "px-4",
          input: "text-sm py-3.5",
          error: "field-error",
        }}
      />
      <Field<FV>
        name="legalEntityType"
        label="What type of legal entity is your organization registered as? This can
        usually be found in your registration/organizing document"
        required
        classes={{ container: "mb-2 mt-6" }}
        placeholder="e.g. Nonprofit Organization"
      />
      <Label className="mt-6 mb-2">
        Select the countries your organization is active in
      </Label>
      <ActivityCountries<FV, "activeInCountries"> name="activeInCountries" />

      <Label className="mt-6">
        Is your organization registered in the United States and recognized by
        the Internal Revenue Service as a nonprofit organization exempt under
        IRC 501(c)(3)?{" "}
        <strong>
          If you are NOT registered in the United States as a 501(c)(3) please
          select No. You will still be able to proceed with registration.
        </strong>
      </Label>
      <div className="flex gap-4 mt-4 accent-orange text-sm">
        <Radio<FV, "isAuthorizedToReceiveTaxDeductibleDonations">
          name="isAuthorizedToReceiveTaxDeductibleDonations"
          value="Yes"
        />
        <Radio<FV, "isAuthorizedToReceiveTaxDeductibleDonations">
          name="isAuthorizedToReceiveTaxDeductibleDonations"
          value="No"
        />
      </div>

      {isAuthorizedToReceiveTaxDeductibleDonations === "No" && (
        <Field<FV, "textarea">
          type="textarea"
          name="projectDescription"
          label="Please provide a description of your organization's charitable activities as well as your charitable mission."
          required
          classes={{ container: "mb-6 mt-4" }}
          placeholder=""
        />
      )}

      <Label className="mt-6">
        Are you happy to accept anonymous donations? If not, ALL donors will be
        required to provide a name and address.
      </Label>
      <div className="flex gap-4 mt-4 accent-orange text-sm">
        <Radio<FV, "isAnonymousDonationsAllowed">
          name="isAnonymousDonationsAllowed"
          value="Yes"
        />
        <Radio<FV, "isAnonymousDonationsAllowed">
          name="isAnonymousDonationsAllowed"
          value="No"
        />
      </div>

      <Separator classes="my-8" />

      <p className="text-sm">
        By submitting this information, you declare that you have read and
        agreed to our{" "}
        <ExtLink className="underline text-orange" href={TERMS_OF_USE_NPO}>
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
          className="py-3 min-w-[8rem] btn-orange btn-reg"
        >
          <LoadText isLoading={isSubmitting}>Continue</LoadText>
        </button>
      </div>
    </form>
  );
}

const Separator = ({ classes = "" }: { classes?: string }) => (
  <div className={`${classes} h-px w-full bg-gray-l3 dark:bg-bluegray`} />
);

const sdgOptions = Object.entries(unsdgs).map(([key, { title }]) => ({
  value: +key,
  label: `${key} - ${title}`,
}));

const fileTooltip = `Valid types are: PDF, JPG, PNG and WEBP. File should be less than ${MB_LIMIT}MB.`;

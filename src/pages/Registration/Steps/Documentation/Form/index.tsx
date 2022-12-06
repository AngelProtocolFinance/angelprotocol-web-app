import { FormValues as FV } from "../types";
import Checkbox from "components/Checkbox";
import ExtLink from "components/ExtLink";
import { Label } from "components/form";
import {
  BtnPrim,
  BtnSec,
  FileDropzone,
  LoadText,
  Selector,
  TextInput,
  checkBoxStyle,
} from "components/registration";
import { unsdgs } from "constants/unsdgs";
import { TERMS_OF_USE } from "constants/urls";
import { steps } from "../../../routes";
import { useRegState } from "../../StepGuard";
import { MB_LIMIT } from "../schema";
import Level from "./Level";
import { Radio } from "./Radio";
import useSubmit from "./useSubmit";

export default function Form() {
  const { data } = useRegState<2>();
  const { submit, isSubmitting } = useSubmit();
  return (
    <form className="w-full" onSubmit={submit}>
      <Level num={1} />
      <p className="mt-2 text-sm">
        Your organization is eligible to create its endowment. Donors can donate
        funds through your organization’s landing page on Angel Protocol’s
        interface. Your organization is not displayed on the marketplace and
        cannot be found through the search bar.
      </p>
      <Label className="mt-8 mb-2" required>
        Your proof of identity
      </Label>
      <FileDropzone<FV, "proofOfIdentity">
        name="proofOfIdentity"
        tooltip={fileTooltip}
      />
      <TextInput<FV>
        name="website"
        label="Website of your organization"
        required
        classes={{ container: "my-6" }}
        placeholder="e.g. https://www.example.com"
      />
      <Label className="mb-2" required>
        Proof of registration as a 501(C)(3) charity or equivalent
      </Label>
      <FileDropzone<FV, "proofOfRegistration">
        name="proofOfRegistration"
        tooltip={fileTooltip}
      />
      <Label className="mb-2 mt-6" required>
        Select the Sustainable Development Goals your organization is the most
        aligned with
      </Label>
      <Selector<FV, "sdgs", number, true>
        multiple
        name="sdgs"
        options={sdgOptions}
      />

      <Separator classes="my-8" />

      <Level num={2} />
      <p className="mt-2 text-sm mb-8">
        All benefits from Level 1 + your organization will be visible in the
        marketplace.
      </p>
      <Label className="mb-2">
        At least one of the last 2 year’s financial statements
      </Label>
      <FileDropzone<FV, "financialStatements">
        multiple
        name="financialStatements"
        tooltip={fileTooltip}
      />

      <Separator classes="my-8" />

      <Level num={3} />
      <p className="mt-2 text-sm mb-8">
        3rd party audited financial report or published Annual Report
      </p>
      <Label className="mb-2">
        At least one of the last 2 year’s financial statements
      </Label>
      <FileDropzone<FV, "auditedFinancialReports">
        multiple
        name="auditedFinancialReports"
        tooltip={fileTooltip}
      />

      <Separator classes="my-8" />

      <Label>
        Only accept donations from donors who have provided their personal
        information (name and address):
      </Label>
      <div className="flex gap-4 mt-4">
        <Radio value="Yes" />
        <Radio value="No" />
      </div>
      <Separator classes="my-8" />
      <Checkbox<FV>
        name="hasAuthority"
        required
        classes={{
          container: "text-sm mb-3",
          checkbox: checkBoxStyle + " self-start sm:self-center",
          error: "mt-1",
        }}
      >
        By checking this box, you declare that you have the authority to create
        an endowment in the name of {data.contact.orgName} through Angel
        Protocol
      </Checkbox>
      <Checkbox<FV>
        name="hasAgreedToTerms"
        required
        classes={{
          container: "text-sm",
          checkbox: checkBoxStyle + " self-start sm:self-center",
          error: "mt-1",
        }}
      >
        By checking this box, you declare that you have read and agreed to our{" "}
        {""}
        <ExtLink className="underline text-orange" href={TERMS_OF_USE}>
          Terms & Conditions
        </ExtLink>
      </Checkbox>
      <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
        <BtnSec
          aria-disabled={isSubmitting}
          as="link"
          to={`../${steps.contact}`}
          state={data.init}
          className="py-3 min-w-[8rem] text-center"
        >
          Back
        </BtnSec>
        <BtnPrim
          disabled={isSubmitting}
          type="submit"
          className="py-3 min-w-[8rem] text-center"
        >
          <LoadText isLoading={isSubmitting}>Continue</LoadText>
        </BtnPrim>
      </div>
    </form>
  );
}

const Separator = ({ classes = "" }: { classes?: string }) => (
  <div className={`${classes} h-px w-full bg-gray-l2 dark:bg-bluegray`} />
);

const sdgOptions = Object.entries(unsdgs).map(([key, { title }]) => ({
  value: +key,
  label: `${key} - ${title}`,
}));

const fileTooltip = `Valid types are: PDF, JPG, PNG and WEBP. File should be less than ${MB_LIMIT}MB.`;

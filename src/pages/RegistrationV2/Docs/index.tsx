import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues as FV } from "./types";
import { FileObject } from "types/aws";
import Checkbox from "components/Checkbox";
import { Label } from "components/form";
import {
  BtnPrim,
  BtnSec,
  Selector,
  TextInput,
  checkBoxStyle,
} from "components/registration";
import { unsdgs } from "constants/unsdgs";
import { TERMS_OF_USE } from "constants/urls";
import FileDropzone, { Asset } from "./FileDropzone";
import { Radio } from "./Radio";
import { schema } from "./schema";

export default function Docs() {
  const methods = useForm<FV>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      proofOfIdentity: genFileAsset([]),
      proofOfRegistration: genFileAsset([]),
      financialStatements: genFileAsset([]),
      auditedFinancialReports: genFileAsset([]),
      website: "",
      hasAuthority: false,
      hasAgreedToTerms: false,
      isKYCRequired: "No",
      sdgs: [],
    },
  });

  async function fakeSubmit() {
    await new Promise((r) => setTimeout(r, 1500));
    alert("submitted");
  }

  return (
    <FormProvider {...methods}>
      <form
        className="padded-container max-w-[45.5rem] justify-self-center mt-28"
        onSubmit={methods.handleSubmit(fakeSubmit)}
      >
        <Level num={1} />
        <p className="mt-2 text-sm">
          Your organization is eligible to create its endowment. Donors can
          donate funds through your organization’s landing page on Angel
          Protocol’s interface. Your organization is not displayed on the
          marketplace and cannot be found through the search bar.
        </p>
        <Label className="mt-8 mb-2" required>
          Your proof of identity
        </Label>
        <FileDropzone<FV, "proofOfIdentity">
          name="proofOfIdentity"
          tooltip="Valid types are: PDF, JPG, PNG and WEBP. File should be less than 1MB."
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
        <FileDropzone<FV, "proofOfIdentity">
          name="proofOfIdentity"
          tooltip="Valid types are: PDF, JPG, PNG and WEBP. File should be less than 1MB."
        />
        <Label className="mb-2 mt-6" required>
          Select one SDG your organization is aligned with
        </Label>
        <Selector<FV, "sdgs", number, true>
          multiple
          name="sdgs"
          options={Object.entries(unsdgs).map(([key, { title }]) => ({
            value: +key,
            label: `${key} - ${title}`,
          }))}
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
        <FileDropzone<FV, "proofOfIdentity">
          name="proofOfIdentity"
          tooltip="Valid types are: PDF, JPG, PNG and WEBP. File should be less than 1MB."
        />

        <Separator classes="my-8" />

        <Level num={3} />
        <p className="mt-2 text-sm mb-8">
          3rd party audited financial report or published Annual Report
        </p>
        <Label className="mb-2">
          At least one of the last 2 year’s financial statements
        </Label>
        <FileDropzone<FV, "proofOfIdentity">
          name="proofOfIdentity"
          tooltip="Valid types are: PDF, JPG, PNG and WEBP. File should be less than 1MB."
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
            checkbox: checkBoxStyle,
            error: "mt-1",
          }}
        >
          By checking this box, you declare that you have the authority to
          create an endowment in the name of{" "}
          <span className="text-red">My Organization (placeholder)</span>{" "}
          through Angel Protocol
        </Checkbox>
        <Checkbox<FV>
          name="hasAgreedToTerms"
          required
          classes={{
            container: "text-sm",
            checkbox: checkBoxStyle,
            error: "mt-1",
          }}
        >
          By checking this box, you declare that you have read and agreed to our{" "}
          {""}
          <a
            className="underline text-orange"
            target="_blank"
            href={TERMS_OF_USE}
            rel="noopener noreferrer"
          >
            Terms & Conditions
          </a>
        </Checkbox>
        <div className="grid sm:flex gap-2 my-8">
          <BtnSec as="link" to="" className="py-3 min-w-[8rem] text-center">
            Back
          </BtnSec>
          <BtnPrim type="submit" className="py-3 min-w-[8rem] text-center">
            Continue
          </BtnPrim>
        </div>
      </form>
    </FormProvider>
  );
}

function Level({ num }: { num: number }) {
  return (
    <h4 className="flex items-center gap-2.5">
      <div className="h-5 relative aspect-square border rounded-full before:content-[''] before:h-3 before:aspect-square before:absolute-center before:rounded-full before:bg-green" />
      <span className="text-lg font-bold">Level {num}</span>
    </h4>
  );
}

const Separator = ({ classes = "" }: { classes?: string }) => (
  <div className={`${classes} h-px w-full bg-gray-l2`} />
);

function genFileAsset(previews: FileObject[]): Asset {
  return { files: [], previews };
}

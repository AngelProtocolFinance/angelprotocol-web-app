import { FormProvider, useForm } from "react-hook-form";
import { ContactRoles, ReferralMethods } from "types/aws";
import Checkbox from "components/Checkbox";
import { Label } from "components/form";
import { BtnPrim, BtnSec, Selector, TextInput } from "components/registration";
import { TERMS_OF_USE } from "constants/urls";
import { Asset } from "./FileDropzone";

type FormValues = {
  proofOfIdentity: Asset;
  proofOfRegistration: Asset;
  financialStatements: Asset;
  annualReports: Asset;
  website: string;
  sdgs: number[];
  isKYCRequired: boolean;
  hasAuthority: boolean;
  hasAgreedToTerms: boolean;
};

export default function Docs() {
  const methods = useForm({
    defaultValues: {
      role: { value: "ceo", label: "CEO" },
      referralMethod: { value: "twitter", label: "Twitter" },
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
        <Checkbox name="hasAuthority" required>
          By checking this box, you declare that you have the authority to
          create an endowment in the name of My Organization through Angel
          Protocol
        </Checkbox>
        <Checkbox name="hasAgreedToTerms" required>
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

const roles: { [key in ContactRoles]: string } = {
  president: "Chairperson / President",
  "vice-president": "Vice-chairperson / Vice president",
  secretary: "Secretary",
  treasurer: "Treasurer",
  ceo: "CEO",
  cfo: "CFO",
  "board-member": "Board Member",
  "leadership-team": "Leadership Team",
  "fundraising-finance": "Fundraising / Finance",
  legal: "Legal",
  communications: "Communications",
  other: "Other",
};

const referralMethods: { [key in ReferralMethods]: string } = {
  "angel-alliance": "Angel Alliance",
  discord: "Discord",
  facebook: "Facebook",
  linkedin: "Linkedin",
  medium: "Medium",
  press: "Press",
  "search-engines": "Search engines",
  twitter: "Twitter",
  other: "Other",
};

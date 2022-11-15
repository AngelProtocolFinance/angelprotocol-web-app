import { FormProvider, useForm } from "react-hook-form";
import { FormValues as FV } from "./types";
import { ContactRoles, ReferralMethods } from "types/aws";
import Checkbox from "components/Checkbox";
import { Label } from "components/form";
import {
  BtnPrim,
  BtnSec,
  Selector,
  TextInput,
  checkBoxStyle,
} from "components/registration";
import { TERMS_OF_USE } from "constants/urls";
import { Asset } from "./FileDropzone";
import { Radio } from "./Radio";

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
        <Checkbox
          name="hasAuthority"
          required
          classes={{ container: "text-sm mb-3", checkbox: checkBoxStyle }}
        >
          By checking this box, you declare that you have the authority to
          create an endowment in the name of My Organization through Angel
          Protocol
        </Checkbox>
        <Checkbox
          name="hasAgreedToTerms"
          required
          classes={{ container: "text-sm", checkbox: checkBoxStyle }}
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

const Separator = ({ classes = "" }: { classes?: string }) => (
  <div className={`${classes} h-px w-full bg-gray-l2`} />
);

import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { FormValues as FV } from "../types";
import { RichTextEditor } from "components/RichText";
import { Label } from "components/form";
import { BtnOutline, BtnPrim, BtnSec, TextInput } from "components/gift";
import { appRoutes } from "constants/routes";

export default function Form({ classes = "" }) {
  const {
    reset,
    handleSubmit,
    getValues,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<FV>();

  function submit(data: FV) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`justify-self-center grid padded-container w-full max-w-[32rem] gap-6 ${classes}`}
      autoComplete="off"
    >
      <h3 className="text-center text-3xl font-bold leading-snug">
        Send Your Angel Protocol Giftcard via Email
      </h3>
      <TextInput<FV> name="purchaser" label="Your name" />
      <TextInput<FV> name="recipient.name" label="Recipient name" />
      <TextInput<FV> name="recipient.email" label="Recipient email address" />
      <Label className="-mb-4">Add personalized note</Label>
      <RichTextEditor<FV>
        fieldName="message"
        classes={{
          container:
            "rich-text-toolbar border border-gray-l2 dark:border-bluegray text-sm grid grid-rows-[auto_10rem] rounded bg-orange-l6 dark:bg-blue-d6 p-3",
          error: "text-right text-red dark:text-red-l1 text-xs -mt-4",
          charCounter: "text-gray-d1 dark:text-gray",
        }}
        charLimit={500}
      />
      <div className="grid grid-cols-2 gap-5 font-body mt-8 md:mt-12">
        <BtnSec>Reset</BtnSec>
        <BtnPrim type="submit">Submit</BtnPrim>
        <BtnOutline as="link" to={appRoutes.marketplace}>
          Back to the platform
        </BtnOutline>
      </div>
    </form>
  );
}

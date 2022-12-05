import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "../types";
import { useModalContext } from "contexts/ModalContext";
import Prompt from "components/Prompt";
import { RichTextEditor } from "components/RichText";
import { Label } from "components/form";
import { BtnOutline, BtnPrim, BtnSec, TextInput } from "components/gift";
import { createAuthToken } from "helpers";
import { appRoutes } from "constants/routes";
import { APIs } from "constants/urls";

export default function Form({ classes = "" }) {
  const { handleSubmit } = useFormContext<FV>();
  const { showModal } = useModalContext();

  async function submit({ recipient, secret }: FV) {
    const res = await fetch(APIs.aws + "/v1/giftcard/send-email", {
      method: "POST",
      headers: { authorization: createAuthToken("angelprotocol-web-app") },
      body: JSON.stringify({ email: recipient.email, secret }),
    });
    if (!res.ok) {
      return showModal(Prompt, {
        type: "error",
        headline: "Confirmation",
        title: "Failed to send gift card",
      });
    }
    showModal(Prompt, {
      type: "success",
      headline: "Confirmation",
      title: "Giftcard Sent Successfully",
      children: (
        <p className="text-center text-gray-d1 dark:text-gray">
          Your gift card message to{" "}
          <span className="font-bold">{recipient.email}</span> has been
          successfully sent.
        </p>
      ),
    });
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`justify-self-center grid padded-container w-full max-w-[32rem] gap-5 ${classes}`}
      autoComplete="off"
    >
      <h3 className="text-center text-3xl font-bold leading-snug">
        Send Your Angel Protocol Giftcard via Email
      </h3>
      <TextInput<FV> name="purchaser" label="Your name" />
      <TextInput<FV> name="recipient.name" label="Recipient name" />
      <TextInput<FV> name="recipient.email" label="Recipient email address" />
      <Label className="-mb-3">Add personalized note</Label>
      <RichTextEditor<FV>
        fieldName="message"
        classes={{
          container:
            "rich-text-toolbar border border-gray-l2 dark:border-bluegray text-sm grid grid-rows-[auto_10rem] rounded bg-white dark:bg-blue-d6 aria-disabled:bg-gray-l4 aria-disabled:dark:bg-bluegray-d1 p-3 break-words",
          error: "text-right text-red dark:text-red-l1 text-xs -mt-4",
          charCounter: "text-gray-d1 dark:text-gray",
        }}
        charLimit={500}
      />
      <div className="grid grid-cols-2 gap-5 font-body mt-3">
        <BtnSec>Reset</BtnSec>
        <BtnPrim type="submit">Submit</BtnPrim>
        <BtnOutline
          as="link"
          to={appRoutes.marketplace}
          className="col-span-full sm:justify-self-center sm:mt-10 px-11 py-3"
        >
          Back to the platform
        </BtnOutline>
      </div>
    </form>
  );
}

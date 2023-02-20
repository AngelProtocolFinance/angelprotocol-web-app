import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { FormValues as FV } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Prompt from "components/Prompt";
import { RichTextEditor } from "components/RichText";
import { Label } from "components/form";
import { Field } from "components/form";
import { createAuthToken } from "helpers";
import { APP_NAME } from "constants/common";
import { appRoutes } from "constants/routes";
import { APIs } from "constants/urls";

export default function Form({ classes = "" }) {
  const { handleSubmit, reset } = useFormContext<FV>();
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
        {`Send Your ${APP_NAME} Giftcard via Email`}
      </h3>
      <Field<FV> name="purchaser" label="Your name" classes="field-gift" />
      <Field<FV>
        name="recipient.name"
        label="Recipient name"
        classes="field-gift"
      />
      <Field<FV>
        name="recipient.email"
        label="Recipient email address"
        classes="field-gift"
      />
      <Label className="-mb-3">Add personalized note</Label>
      <RichTextEditor<FV>
        fieldName="message"
        classes={{
          container:
            "rich-text-toolbar border border-prim text-sm grid grid-rows-[auto_10rem] rounded bg-white dark:bg-blue-d6 aria-disabled:bg-gray-l5 aria-disabled:dark:bg-bluegray-d1 p-3 break-words",
          error: "text-right text-red dark:text-red-l1 text-xs -mt-4",
          charCounter: "text-gray-d1 dark:text-gray",
        }}
        charLimit={500}
      />
      <div className="grid grid-cols-2 gap-5 font-body mt-3">
        <button
          type="button"
          className="btn-outline-filled btn-gift"
          onClick={() => {
            reset();
          }}
        >
          Reset
        </button>
        <button className="btn-orange btn-gift" type="submit">
          Submit
        </button>
        <Link
          to={appRoutes.marketplace}
          className="btn-outline-filled btn-gift col-span-full sm:justify-self-center sm:mt-10 px-11"
        >
          Back to the platform
        </Link>
      </div>
    </form>
  );
}

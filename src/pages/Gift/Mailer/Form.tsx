import { RichTextEditor } from "components/RichText";
import { Field, Label } from "components/form";
import { APP_NAME } from "constants/env";
import { appRoutes } from "constants/routes";
import { APIs } from "constants/urls";
import { useErrorContext } from "contexts/ErrorContext";
import { richTextToHTML } from "helpers/richTextToHtml";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import Success from "./Success";
import type { FormValues as FV } from "./types";

export default function Form({ classes = "" }) {
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useFormContext<FV>();
  const [recipient, setRecipient] = useState<string>();
  const { handleError } = useErrorContext();

  async function submit({ recipient, secret, message }: FV) {
    try {
      const res = await fetch(APIs.aws + "/v1/giftcard/send-email", {
        method: "POST",
        body: JSON.stringify({
          email: recipient.email,
          secret,
          note: richTextToHTML(message.value),
        }),
      });

      if (!res.ok) throw await res.json();

      setRecipient(recipient.email);
    } catch (error) {
      handleError(error, { context: "sending giftcard" });
    }
  }

  if (recipient) {
    return <Success className={classes} recipient={recipient} />;
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`justify-self-center grid padded-container w-full max-w-[32rem] gap-5 ${classes}`}
      autoComplete="off"
    >
      <h3 className="text-center text-3xl leading-snug">
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
            "rich-text-toolbar border border-gray-l4 text-sm grid grid-rows-[auto_10rem] rounded bg-white dark:bg-blue-d6 aria-disabled:bg-gray-l5 aria-disabled:dark:bg-navy-d3 p-3 break-words",
          error: "text-right text-red dark:text-red-l1 text-xs -mt-4",
          charCounter: "text-navy-l1 dark:text-navy-l2",
        }}
        charLimit={500}
      />
      <div className="grid grid-cols-2 gap-5 mt-3">
        <button
          type="button"
          className="btn-outline-filled btn-gift"
          onClick={() => {
            reset();
          }}
        >
          Reset
        </button>
        <button
          className="btn-blue btn-gift"
          type="submit"
          disabled={isSubmitting}
        >
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

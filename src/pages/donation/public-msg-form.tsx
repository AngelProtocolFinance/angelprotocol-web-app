import { use_action_result } from "hooks/use-action-result";
import { useState } from "react";
import { Form, useFetcher } from "react-router";
import { useRemixForm } from "remix-hook-form";
import { donor_public_msg_max_length } from "types/donation-intent";
import type { IPublicMsgFv } from "./schema";

interface Props {
  init?: string;
  classes?: string;
}
export function PublicMsgForm({ classes = "", init }: Props) {
  const fetcher = useFetcher();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useRemixForm<IPublicMsgFv>({
    fetcher,
    defaultValues: { msg: init, type: "public_msg" },
  });

  use_action_result(fetcher.data);
  const [with_notif, set_with_notif] = useState(false);

  const msg = watch("msg");

  return (
    <Form onSubmit={handleSubmit} method="POST" className={`${classes}`}>
      <div className="col-span-full">
        <label htmlFor="public-msg-textarea" className="sr-only">
          Public message
        </label>
        <p
          id="public-msg-char-count"
          data-exceed={errors.msg?.type === "max"}
          className="text-xs text-gray-l1 -mt-2 data-[exceed='true']:text-red text-right mb-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {msg?.length ?? 0}/{donor_public_msg_max_length}
        </p>
        <textarea
          {...register("msg")}
          id="public-msg-textarea"
          aria-invalid={!!errors.msg?.message}
          aria-describedby={`public-msg-char-count${errors.msg?.message ? " public-msg-error" : ""}`}
          maxLength={donor_public_msg_max_length}
          rows={4}
          className="field-input w-full text-base font-semibold"
        />
        <p
          id="public-msg-error"
          className="text-red text-xs empty:hidden text-right"
          role="alert"
        >
          {errors.msg?.message}
        </p>
      </div>
      <button
        disabled={fetcher.state !== "idle"}
        type="submit"
        className="btn btn-blue text-sm px-4 py-2 rounded mt-4 justify-self-end"
      >
        Submit
      </button>
    </Form>
  );
}

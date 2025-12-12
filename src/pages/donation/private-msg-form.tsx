import { donor_public_msg_max_length } from "lib/donations/donation-intent";
import { Form, useFetcher } from "react-router";
import { useRemixForm } from "remix-hook-form";
import type { IPrivateMsgFv } from "./schema";

interface Props {
  init?: string;
  classes?: string;
}
export function PrivateMsgForm({ classes = "", init }: Props) {
  const fetcher = useFetcher({ key: "donation" });
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useRemixForm<IPrivateMsgFv>({
    fetcher,
    defaultValues: { msg: init, type: "private_msg" },
  });

  const msg = watch("msg");

  return (
    <Form onSubmit={handleSubmit} method="POST" className={`${classes}`}>
      <div className="col-span-full">
        <label htmlFor="msg-textarea" className="sr-only">
          Private message
        </label>
        <p
          id="msg-char-count"
          data-exceed={errors.msg?.type === "max"}
          className="text-xs text-gray-l1 -mt-2 data-[exceed='true']:text-red text-right mb-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {msg?.length ?? 0}/{donor_public_msg_max_length}
        </p>
        <textarea
          {...register("msg")}
          disabled={!!init}
          id="msg-textarea"
          aria-invalid={!!errors.msg?.message}
          aria-describedby={`msg-char-count${errors.msg?.message ? " msg-error" : ""}`}
          maxLength={donor_public_msg_max_length}
          rows={4}
          className="field-input w-full text-base font-semibold"
        />
        <p
          id="msg-error"
          className="text-red text-xs empty:hidden text-right"
          role="alert"
        >
          {errors.msg?.message}
        </p>
      </div>
      <button
        disabled={fetcher.state !== "idle" || !!init}
        type="submit"
        className="btn btn-blue text-sm px-4 py-2 rounded mt-4 justify-self-end"
      >
        Submit
      </button>
    </Form>
  );
}

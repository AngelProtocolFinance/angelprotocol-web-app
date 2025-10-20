import { CheckField, Field } from "components/form";
import { use_action_result } from "hooks/use-action-result";
import { useState } from "react";
import { Form, useFetcher } from "react-router";
import { useRemixForm } from "remix-hook-form";
import { type Tribute, from_msg_max_length } from "types/donation-intent";
import type { TributeFv } from "./schema";

interface Props {
  init?: Tribute;
  classes?: string;
}
export function TributeForm({ classes = "", init }: Props) {
  const fetcher = useFetcher();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useRemixForm<TributeFv>({
    fetcher,
    defaultValues: { ...init, type: "tribute" },
  });

  use_action_result(fetcher.data);
  const [with_notif, set_with_notif] = useState(false);

  const custom_msg = watch("notif.from_msg");

  return (
    <Form onSubmit={handleSubmit} method="POST" className={`${classes}`}>
      <Field
        {...register("full_name")}
        label="Honoree's name"
        placeholder="e.g. Jane Doe"
        classes={{
          container: "[&_input]:bg-white",
          input: "field-input-donate",
        }}
        required
        error={errors.full_name?.message}
      />
      <CheckField
        checked={with_notif}
        onChange={(x) => {
          set_with_notif(x.target.checked);
        }}
        classes="col-span-full mt-3 text-sm"
      >
        Notify someone about this tribute
      </CheckField>

      {with_notif && (
        <div className="grid gap-y-3 mt-4">
          <Field
            {...register("notif.to_fullname", { shouldUnregister: true })}
            label="Recipient name"
            placeholder="e.g. Jane Doe"
            classes={{
              container: "[&_label]:text-sm [&_input]:text-sm",
              input: "field-input-donate",
            }}
            required
            error={errors.notif?.to_fullname?.message}
          />
          <Field
            {...register("notif.to_email", { shouldUnregister: true })}
            label="Email address"
            placeholder="e.g. janedoe@better.giving"
            classes={{
              container: "[&_label]:text-sm [&_input]:text-sm",
              input: "field-input-donate",
            }}
            required
            error={errors.notif?.to_email?.message}
          />
          <Field
            {...register("notif.from_msg", { shouldUnregister: true })}
            rows={2}
            type="textarea"
            label="Custom message"
            placeholder="Message to recipient"
            classes={{
              container: "[&_label]:text-sm [&_textarea]:text-sm",
              input: "field-input-donate",
            }}
            required={false}
            error={errors.notif?.from_msg?.message}
          />
          <p
            data-exceed={errors.notif?.from_msg?.type === "max"}
            className="text-xs text-gray-l1 -mt-2 data-[exceed='true']:text-red"
          >
            {custom_msg?.length ?? 0}/{from_msg_max_length}
          </p>
        </div>
      )}
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

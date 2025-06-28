import { CheckField, Field } from "components/form";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { type Tribute, from_msg_max_length } from "types/donation-intent";

interface SubFV {
  tribute?: Tribute;
  with_tribute?: boolean;
  with_tribute_notif?: boolean;
}

interface Props {
  register: UseFormRegister<SubFV>;
  errors: FieldErrors<SubFV>;
  custom_msg?: string;
  wid: {
    tribute?: boolean;
    tribute_notif?: boolean;
  };
  classes?: string;
}

export function TributeFields({
  register,
  wid,
  errors,
  custom_msg,
  classes = "",
}: Props) {
  return (
    <div className={classes}>
      <CheckField {...register("with_tribute")}>
        Dedicate my donation
      </CheckField>

      {wid.tribute && (
        <div className="col-span-full p-4 bg-blue-l5 rounded-lg mt-2 shadow-inner">
          <Field
            {...register("tribute.full_name")}
            label="Honoree's name"
            placeholder="e.g. Jane Doe"
            classes={{
              container: "[&_input]:bg-white",
              input: "field-input-donate",
            }}
            required
            error={errors.tribute?.full_name?.message}
          />
          <CheckField
            {...register("with_tribute_notif")}
            classes="col-span-full mt-3 text-sm"
          >
            Notify someone about this tribute
          </CheckField>

          {wid.tribute_notif && (
            <div className="grid gap-y-3 mt-4 rounded-lg p-4 bg-white shadow-inner">
              <Field
                {...register("tribute.notif.to_fullname")}
                label="Recipient name"
                placeholder="e.g. Jane Doe"
                classes={{
                  container: "[&_label]:text-sm [&_input]:text-sm",
                  input: "field-input-donate",
                }}
                required
                error={errors.tribute?.notif?.to_fullname?.message}
              />
              <Field
                {...register("tribute.notif.to_email")}
                label="Email address"
                placeholder="e.g. janedoe@better.giving"
                classes={{
                  container: "[&_label]:text-sm [&_input]:text-sm",
                  input: "field-input-donate",
                }}
                required
                error={errors.tribute?.notif?.to_email?.message}
              />
              <Field
                {...register("tribute.notif.from_msg")}
                rows={2}
                type="textarea"
                label="Custom message"
                placeholder="Message to recipient"
                classes={{
                  container: "[&_label]:text-sm [&_textarea]:text-sm",
                  input: "field-input-donate",
                }}
                required={false}
                error={errors.tribute?.notif?.from_msg?.message}
              />
              <p
                data-exceed={errors.tribute?.notif?.from_msg?.type === "max"}
                className="text-xs text-gray-l1 -mt-2 data-[exceed='true']:text-red"
              >
                {custom_msg?.length ?? 0}/{from_msg_max_length}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

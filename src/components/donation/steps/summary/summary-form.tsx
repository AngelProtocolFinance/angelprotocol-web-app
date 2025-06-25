import type { DonateMethodId } from "@better-giving/endowment";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { CheckField, Field, Form } from "components/form";
import { Select } from "components/selector/select";
import { Eraser, PenToolIcon } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { type Donor, donor, donor_titles } from "types/donation-intent";
import {
  donor_msg_to_npo_max_length,
  donor_public_msg_max_length,
  from_msg_max_length,
} from "types/donation-intent";
import { type InferOutput, boolean, object, optional } from "valibot";
import { init_tribute_notif } from "../common/constants";
import ContinueBtn from "../common/continue-btn";
import { type Mode, type Tribute, tribute } from "../types";

const schema = object({
  is_with_msg_to_npo: boolean(),
  uk_tax_resident: boolean(),
  ...donor.entries,
  with_tribute: boolean(),
  with_tribute_notif: boolean(),
  tribute: optional(tribute),
  cover_fee: boolean(),
});

interface FV extends InferOutput<typeof schema> {}

const default_fv = (
  cover_fee: boolean,
  tribute?: Tribute,
  donor?: Donor
): FV => {
  const fv: FV = {
    title: "",
    first_name: "",
    last_name: "",
    email: "",
    cover_fee,
    uk_tax_resident: false,
    is_with_msg_to_npo: (donor?.public_msg?.length ?? 0) > 0,
    ...donor,
    with_tribute: false,
    with_tribute_notif: false,
    tribute,
  };
  return fv;
};

export type Props = {
  onSubmit(formValues: FV): void;
  classes?: string;
  donor?: Donor;
  tribute?: Tribute;
  coverFee: boolean;
  recipientName: string;
  recipientMembers: string[];
  mode: Mode;
  method: DonateMethodId;
};

export default function SummaryForm({ classes = "", ...props }: Props) {
  const {
    handleSubmit,
    watch,
    formState: { errors },
    register,
    control,
    setValue,
  } = useForm<FV>({
    defaultValues: default_fv(props.coverFee, props.tribute, props.donor),
    resolver: valibotResolver(schema),
  });

  const [with_donor_msg, set_with_donor_msg] = useState<boolean>(
    (props.donor?.public_msg?.length ?? 0) > 0
  );

  const { field: title } = useController({
    name: "title",
    control,
  });

  const uk_tax_resident = watch("uk_tax_resident");
  const with_honorary = watch("with_tribute");
  const with_tribute_notif = watch("with_tribute_notif");
  const custom_msg = watch("tribute.notif.from_msg");
  const is_donor_public = watch("is_public");
  const donor_public_msg = watch("public_msg");
  const donor_msg_to_npo = watch("msg_to_npo");
  const is_with_msg_to_npo = watch("is_with_msg_to_npo");

  return (
    <Form
      onSubmit={handleSubmit(props.onSubmit)}
      className={`grid grid-cols-2 gap-x-4 ${classes}`}
    >
      <Select
        label={
          <span className="font-semibold text-base font-heading">Title</span>
        }
        value={title.value}
        onChange={title.onChange}
        options={donor_titles as any}
        option_disp={(opt) => opt}
        classes={{
          container: "col-span-full mb-4",
          button: "field-input-donate",
        }}
      />
      <Field
        {...register("first_name")}
        label="Your name"
        placeholder="First Name"
        required
        classes={{
          label: "font-semibold text-base font-heading",
          input: "field-input-donate",
        }}
        error={errors.first_name?.message}
      />
      <Field
        {...register("last_name")}
        label="Last name"
        placeholder="Last Name"
        classes={{
          input: "field-input-donate",
          label: "font-semibold text-base font-heading invisible",
        }}
        error={errors.last_name?.message}
      />
      <Field
        {...register("company_name")}
        label="Your company name"
        placeholder="Company name"
        classes={{
          label: "font-semibold text-base font-heading",
          container: "col-span-full mt-4",
          input: "field-input-donate",
        }}
        error={errors.company_name?.message}
      />
      <Field
        {...register("email")}
        label="Your email"
        placeholder="Email address"
        classes={{
          label: "font-semibold text-base font-heading",
          container: "col-span-full my-4",
          input: "field-input-donate",
        }}
        error={errors.email?.message}
        required
      />
      <div className="col-span-full flex gap-x-2 flex-wrap gap-y-1 items-center">
        <CheckField
          {...register("is_public", {
            onChange: (ev: ChangeEvent<HTMLInputElement>) => {
              const x = ev.target.checked;
              if (!x) {
                setValue("public_msg", undefined);
                set_with_donor_msg(false);
              }
            },
          })}
        >
          Share my support publicly
        </CheckField>
        {is_donor_public && (
          <button
            onClick={() => set_with_donor_msg((p) => !p)}
            type="button"
            className={`${with_donor_msg ? "text-red-l1" : "text-(--accent-primary) hover:enabled:text-(--accent-primary)"} font-semibold normal-case flex items-center gap-x-1 text-xs`}
          >
            {with_donor_msg ? (
              <Eraser size={12} className="shrink-0" />
            ) : (
              <PenToolIcon size={12} className="rotate-z-270 shrink-0" />
            )}
            <span>{with_donor_msg ? "Remove" : "Add"} testimony</span>
          </button>
        )}
      </div>
      {is_donor_public && with_donor_msg && (
        <div className="col-span-full">
          <p
            data-exceed={errors.public_msg?.type === "max"}
            className="text-xs text-gray-l1 -mt-2 data-[exceed='true']:text-red text-right mb-1"
          >
            {/** customMsg becomes undefined when unmounted */}
            {donor_public_msg?.length ?? 0}/{donor_public_msg_max_length}
          </p>
          <textarea
            {...register("public_msg", { shouldUnregister: true })}
            aria-invalid={!!errors.public_msg?.message}
            className="field-input w-full text-base font-semibold"
          />
          <p className="text-red text-xs empty:hidden text-right">
            {errors.public_msg?.message}
          </p>
        </div>
      )}
      {props.recipientMembers.length < 2 && (
        <CheckField
          {...register("is_with_msg_to_npo", {
            onChange(ev: ChangeEvent<HTMLInputElement>) {
              setValue("msg_to_npo", ev.target.checked ? "" : undefined);
            },
          })}
          classes="mt-4"
        >
          Add a note for {props.recipientName}
        </CheckField>
      )}
      {is_with_msg_to_npo && (
        <div className="col-span-full">
          <p
            data-exceed={errors.msg_to_npo?.type === "max"}
            className="text-xs text-gray-l1 -mt-2 data-[exceed='true']:text-red text-right mb-1"
          >
            {/** customMsg becomes undefined when unmounted */}
            {donor_msg_to_npo?.length ?? 0}/{donor_msg_to_npo_max_length}
          </p>
          <textarea
            {...register("msg_to_npo", { shouldUnregister: true })}
            aria-invalid={!!errors.msg_to_npo?.message}
            className="field-input w-full text-base font-semibold"
          />
          <p className="text-red text-xs empty:hidden text-right">
            {errors.msg_to_npo?.message}
          </p>
        </div>
      )}

      {(props.method === "crypto" || props.method === "stripe") && (
        <CheckField {...register("cover_fee")} classes="col-span-full mt-4">
          Cover payment processing fees for your donation{" "}
          <span className="text-gray text-sm">
            (&nbsp;{props.recipientName} receives the full amount&nbsp;)
          </span>
        </CheckField>
      )}
      {/*
      {method !== "crypto" && (
        <CheckField {...register("ukTaxResident")} classes="col-span-full mt-4">
          UK Taxpayer? Supercharge your donation with gift aid
        </CheckField>
      )}
      */}
      {uk_tax_resident && (
        <div className="grid col-span-full gap-y-4 mt-2 mb-6">
          <Field
            {...register("address.street")}
            label="House number"
            placeholder="e.g. 100 Better Giving Rd"
            classes={{ input: "field-input-donate" }}
            required
            error={errors.address?.street?.message}
          />
          <Field
            {...register("address.zip_code")}
            label="Postal code"
            placeholder="e.g. BG21 1BG"
            classes={{ input: "field-input-donate" }}
            required
            error={errors.address?.zip_code?.message}
          />
        </div>
      )}
      <CheckField
        {...register("with_tribute", {
          onChange: (ev: ChangeEvent<HTMLInputElement>) => {
            const x = ev.target.checked;
            setValue("tribute", x ? { full_name: "" } : undefined);
            if (!x) setValue("tribute.notif", undefined);
          },
        })}
        classes="col-span-full mt-4"
      >
        Dedicate my donation
      </CheckField>

      {with_honorary && (
        <div className="col-span-full p-4 bg-blue-l5 rounded-lg mt-2 shadow-inner">
          <Field
            {...register("tribute.full_name", {
              shouldUnregister: true,
            })}
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
            {...register("with_tribute_notif", {
              onChange: (ev: ChangeEvent<HTMLInputElement>) => {
                const x = ev.target.checked;
                setValue("tribute.notif", x ? init_tribute_notif : undefined);
              },
            })}
            classes="col-span-full mt-3 text-sm"
          >
            Notify someone about this tribute
          </CheckField>

          {with_tribute_notif && (
            <div className="grid gap-y-3 mt-4 rounded-lg p-4 bg-white shadow-inner">
              <Field
                {...register("tribute.notif.to_fullname", {
                  shouldUnregister: true,
                })}
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
                {...register("tribute.notif.to_email", {
                  shouldUnregister: true,
                })}
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
                {...register("tribute.notif.from_msg", {
                  shouldUnregister: true,
                })}
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
                {/** customMsg becomes undefined when unmounted */}
                {custom_msg?.length ?? 0}/{from_msg_max_length}
              </p>
            </div>
          )}
        </div>
      )}
      <ContinueBtn
        type="submit"
        disabled={props.mode === "preview"}
        className="px-4 col-span-full mt-6"
        text="Checkout"
      />
    </Form>
  );
}

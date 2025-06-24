import { donor_titles } from "@better-giving/donation/intent";
import type { DonateMethodId } from "@better-giving/endowment";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckField, Field, Form } from "components/form";
import { Select } from "components/selector/select";
import { Eraser, PenToolIcon } from "lucide-react";
import { useState } from "react";
import { useController, useForm } from "react-hook-form";
import { schema } from "schemas/shape";
import { mixed, string } from "yup";
import ContinueBtn from "../common/continue-btn";
import type { FormDonor, Honorary, Mode } from "../types";

type FV = FormDonor & Honorary & { coverFee: boolean };

export type Props = {
  onSubmit(formValues: FV): void;
  classes?: string;
  donor: FormDonor;
  honorary: Honorary;
  coverFee: boolean;
  recipientName: string;
  recipientMembers: string[];
  mode: Mode;
  method: DonateMethodId;
};
const ukTaxResidentKey: keyof FV = "ukTaxResident";
const withHonoraryKey: keyof FV = "withHonorary";
const withTributeNotifKey: keyof FV = "withTributeNotif";

export default function SummaryForm({ classes = "", ...props }: Props) {
  const CUSTOM_MSG_MAX_LENGTH = 250;
  const PUBLIC_MSG_MAX_LENGTH = 500;
  const MSG_TO_NPO_MAX_LENGTH = 500;
  const {
    handleSubmit,
    watch,
    formState: { errors },
    register,
    control,
  } = useForm<FV>({
    defaultValues: {
      ...props.donor,
      ...props.honorary,
      coverFee: props.coverFee,
    },
    resolver: yupResolver(
      schema<FV>({
        first_name: string().required("Please enter your first name"),
        last_name: string().required("Please enter your last name"),
        publicMsg: string().max(
          PUBLIC_MSG_MAX_LENGTH,
          `max ${PUBLIC_MSG_MAX_LENGTH} characters`
        ),
        msg_to_npo: string().max(
          MSG_TO_NPO_MAX_LENGTH,
          `max ${MSG_TO_NPO_MAX_LENGTH} characters`
        ),
        company_name: string(),
        email: string()
          .required("Please enter your email")
          .email("Please check your email for correctness"),
        streetAddress: string().when(ukTaxResidentKey, (values, schema) => {
          const [ukTaxResident] = values as [boolean];
          return ukTaxResident ? schema.required("required") : schema;
        }),
        zipCode: string().when(ukTaxResidentKey, (values, schema) => {
          const [ukTaxResident] = values as [boolean];
          return ukTaxResident ? schema.required("required") : schema;
        }),
        honoraryFullName: string().when(withHonoraryKey, (values, schema) => {
          const [withHonorary] = values as [boolean];
          return withHonorary ? schema.required("required") : schema;
        }),
        tributeNotif: mixed().when(withTributeNotifKey, (values, obj) => {
          const [withTributeNotif] = values as [boolean];
          return !withTributeNotif
            ? obj.optional()
            : schema<FV["tributeNotif"]>({
                to_fullname: string().required("required"),
                to_email: string().required("required").email("invalid email"),
                from_msg: string().max(
                  CUSTOM_MSG_MAX_LENGTH,
                  "must be less than 250 characters"
                ),
              });
        }),
      })
    ),
  });

  const [withDonorMsg, setWithDonorMsg] = useState<boolean>(
    props.donor.publicMsg.length > 0
  );

  const { field: title } = useController<FV, "title">({
    name: "title",
    control,
  });

  const ukTaxResident = watch("ukTaxResident");
  const withHonorary = watch("withHonorary");
  const withTributeNotif = watch("withTributeNotif");
  const customMsg = watch("tributeNotif.from_msg");
  const isPublic = watch("isPublic");
  const publicMsg = watch("publicMsg");
  const is_with_msg_to_npo = watch("is_with_msg_to_npo");
  const msg_to_npo = watch("msg_to_npo");

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
          {...register("isPublic", { onChange: () => setWithDonorMsg(false) })}
        >
          Share my support publicly
        </CheckField>
        {isPublic && (
          <button
            onClick={() => setWithDonorMsg((p) => !p)}
            type="button"
            className={`${withDonorMsg ? "text-red-l1" : "text-(--accent-primary) hover:enabled:text-(--accent-primary)"} font-semibold normal-case flex items-center gap-x-1 text-xs`}
          >
            {withDonorMsg ? (
              <Eraser size={12} className="shrink-0" />
            ) : (
              <PenToolIcon size={12} className="rotate-z-270 shrink-0" />
            )}
            <span>{withDonorMsg ? "Remove" : "Add"} testimony</span>
          </button>
        )}
      </div>
      {isPublic && withDonorMsg && (
        <div className="col-span-full">
          <p
            data-exceed={errors.publicMsg?.type === "max"}
            className="text-xs text-gray-l1 -mt-2 data-[exceed='true']:text-red text-right mb-1"
          >
            {/** customMsg becomes undefined when unmounted */}
            {publicMsg?.length ?? 0}/{PUBLIC_MSG_MAX_LENGTH}
          </p>
          <textarea
            {...register("publicMsg", { shouldUnregister: true })}
            aria-invalid={!!errors.publicMsg?.message}
            className="field-input w-full text-base font-semibold"
          />
          <p className="text-red text-xs empty:hidden text-right">
            {errors.publicMsg?.message}
          </p>
        </div>
      )}
      {props.recipientMembers.length < 2 && (
        <CheckField {...register("is_with_msg_to_npo")} classes="mt-4">
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
            {msg_to_npo?.length ?? 0}/{MSG_TO_NPO_MAX_LENGTH}
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
        <CheckField {...register("coverFee")} classes="col-span-full mt-4">
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
      {ukTaxResident && (
        <div className="grid col-span-full gap-y-4 mt-2 mb-6">
          <Field
            {...register("streetAddress")}
            label="House number"
            placeholder="e.g. 100 Better Giving Rd"
            classes={{ input: "field-input-donate" }}
            required
            error={errors.streetAddress?.message}
          />
          <Field
            {...register("zipCode")}
            label="Postal code"
            placeholder="e.g. BG21 1BG"
            classes={{ input: "field-input-donate" }}
            required
            error={errors.zipCode?.message}
          />
        </div>
      )}
      <CheckField {...register("withHonorary")} classes="col-span-full mt-4">
        Dedicate my donation
      </CheckField>

      {withHonorary && (
        <div className="col-span-full p-4 bg-blue-l5 rounded-lg mt-2 shadow-inner">
          <Field
            {...register("honoraryFullName", {
              shouldUnregister: true,
            })}
            label="Honoree's name"
            placeholder="e.g. Jane Doe"
            classes={{
              container: "[&_input]:bg-white",
              input: "field-input-donate",
            }}
            required
            error={errors.honoraryFullName?.message}
          />
          <CheckField
            {...register("withTributeNotif")}
            classes="col-span-full mt-3 text-sm"
          >
            Notify someone about this tribute
          </CheckField>

          {withTributeNotif && (
            <div className="grid gap-y-3 mt-4 rounded-lg p-4 bg-white shadow-inner">
              <Field
                {...register("tributeNotif.to_fullname", {
                  shouldUnregister: true,
                })}
                label="Recipient name"
                placeholder="e.g. Jane Doe"
                classes={{
                  container: "[&_label]:text-sm [&_input]:text-sm",
                  input: "field-input-donate",
                }}
                required
                error={errors.tributeNotif?.to_fullname?.message}
              />
              <Field
                {...register("tributeNotif.to_email", {
                  shouldUnregister: true,
                })}
                label="Email address"
                placeholder="e.g. janedoe@better.giving"
                classes={{
                  container: "[&_label]:text-sm [&_input]:text-sm",
                  input: "field-input-donate",
                }}
                required
                error={errors.tributeNotif?.to_email?.message}
              />
              <Field
                {...register("tributeNotif.from_msg", {
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
                error={errors.tributeNotif?.from_msg?.message}
              />
              <p
                data-exceed={errors.tributeNotif?.from_msg?.type === "max"}
                className="text-xs text-gray-l1 -mt-2 data-[exceed='true']:text-red"
              >
                {/** customMsg becomes undefined when unmounted */}
                {customMsg?.length ?? 0}/{CUSTOM_MSG_MAX_LENGTH}
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

import type { DonateMethodId } from "@better-giving/endowment";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  NativeCheckField as CheckField,
  NativeField as Field,
  Form,
} from "components/form";
import { List } from "components/selector";
import { Eraser, PenToolIcon } from "lucide-react";
import { useState } from "react";
import { useController, useForm } from "react-hook-form";
import { schema } from "schemas/shape";
import { mixed, string } from "yup";
import { initDonorTitleOption } from "../common/constants";
import ContinueBtn from "../common/continue-btn";
import type { FormDonor, Honorary, Mode } from "../types";

type FV = FormDonor & Honorary & { coverFee: boolean };

export type Props = {
  onSubmit(formValues: FV): void;
  classes?: string;
  donor: FormDonor;
  honorary: Honorary;
  coverFee: boolean;
  nonprofitName: string;
  mode: Mode;
  method: DonateMethodId;
};
const ukTaxResidentKey: keyof FV = "ukTaxResident";
const withHonoraryKey: keyof FV = "withHonorary";
const withTributeNotifKey: keyof FV = "withTributeNotif";
const titleOptions: FV["title"][] = [
  initDonorTitleOption,
  { label: "Mr", value: "Mr" },
  { label: "Mrs", value: "Mrs" },
  { label: "Ms", value: "Ms" },
  { label: "Mx", value: "Mx" },
];

export default function SummaryForm({
  classes = "",
  onSubmit,
  donor,
  honorary,
  coverFee,
  nonprofitName,
  mode,
  method,
}: Props) {
  const CUSTOM_MSG_MAX_LENGTH = 250;
  const PUBLIC_MSG_MAX_LENGTH = 500;
  const {
    handleSubmit,
    watch,
    formState: { errors },
    register,
    control,
  } = useForm<FV>({
    defaultValues: {
      ...donor,
      ...honorary,
      coverFee,
    },
    resolver: yupResolver(
      schema<FV>({
        firstName: string().required("Please enter your first name"),
        lastName: string().required("Please enter your last name"),
        publicMsg: string().max(
          PUBLIC_MSG_MAX_LENGTH,
          `max ${PUBLIC_MSG_MAX_LENGTH} characters`
        ),
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
                toFullName: string().required("required"),
                toEmail: string().required("required").email("invalid email"),
                fromMsg: string().max(
                  CUSTOM_MSG_MAX_LENGTH,
                  "must be less than 250 characters"
                ),
              });
        }),
      })
    ),
  });

  const [withDonorMsg, setWithDonorMsg] = useState(false);
  const { field: title } = useController<FV, "title">({
    name: "title",
    control,
  });

  const ukTaxResident = watch("ukTaxResident");
  const withHonorary = watch("withHonorary");
  const withTributeNotif = watch("withTributeNotif");
  const customMsg = watch("tributeNotif.fromMsg");
  const isPublic = watch("isPublic");
  const publicMsg = watch("publicMsg");

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className={`grid grid-cols-2 gap-x-4 ${classes}`}
    >
      <List
        label={
          <span className="font-semibold text-base font-heading">Title</span>
        }
        value={title.value}
        onChange={title.onChange}
        options={titleOptions}
        classes={{
          container: "col-span-full mb-4",
          button: "field-input-donate",
        }}
      />
      <Field
        {...register("firstName")}
        label="Your name"
        placeholder="First Name"
        required
        classes={{
          label: "font-semibold text-base font-heading",
          input: "field-input-donate",
        }}
        error={errors.firstName?.message}
      />
      <Field
        {...register("lastName")}
        label="Last name"
        placeholder="Last Name"
        classes={{
          input: "field-input-donate",
          label: "font-semibold text-base font-heading invisible",
        }}
        error={errors.lastName?.message}
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

      {(method === "crypto" || method === "stripe") && (
        <CheckField {...register("coverFee")} classes="col-span-full mt-4">
          Cover payment processing fees for your donation{" "}
          <span className="text-gray text-sm">
            (&nbsp;{nonprofitName} receives the full amount&nbsp;)
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
                {...register("tributeNotif.toFullName", {
                  shouldUnregister: true,
                })}
                label="Recipient name"
                placeholder="e.g. Jane Doe"
                classes={{
                  container: "[&_label]:text-sm [&_input]:text-sm",
                  input: "field-input-donate",
                }}
                required
                error={errors.tributeNotif?.toFullName?.message}
              />
              <Field
                {...register("tributeNotif.toEmail", {
                  shouldUnregister: true,
                })}
                label="Email address"
                placeholder="e.g. janedoe@better.giving"
                classes={{
                  container: "[&_label]:text-sm [&_input]:text-sm",
                  input: "field-input-donate",
                }}
                required
                error={errors.tributeNotif?.toEmail?.message}
              />
              <Field
                {...register("tributeNotif.fromMsg", {
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
                error={errors.tributeNotif?.fromMsg?.message}
              />
              <p
                data-exceed={errors.tributeNotif?.fromMsg?.type === "max"}
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
        disabled={mode === "preview"}
        className="px-4 col-span-full mt-6"
        text="Checkout"
      />
    </Form>
  );
}

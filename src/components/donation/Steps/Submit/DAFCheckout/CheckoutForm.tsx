import { yupResolver } from "@hookform/resolvers/yup";
import {
  NativeCheckField as CheckField,
  NativeField as Field,
  Form,
} from "components/form";
import { useForm } from "react-hook-form";
import { schema } from "schemas/shape";
import type { DonateMethodId } from "types/lists";
import { mixed, string } from "yup";
import ContinueBtn from "../../common/ContinueBtn";
import type { Honorary, Mode } from "../../types";

type FV = Honorary & { coverFee: boolean; ukTaxResident: boolean };

export type Props = {
  onSubmit(formValues: FV): void;
  classes?: string;
  honorary: Honorary;
  coverFee: boolean;
  nonprofitName: string;
  mode: Mode;
  method: DonateMethodId;
};

const withHonoraryKey: keyof FV = "withHonorary";
const withTributeNotifKey: keyof FV = "withTributeNotif";

export default function SummaryForm({
  classes = "",
  onSubmit,
  honorary,
  coverFee,
  nonprofitName,
  mode,
}: Props) {
  const CUSTOM_MSG_MAX_LENGTH = 250;
  const {
    handleSubmit,
    watch,
    formState: { errors },
    register,
  } = useForm<FV>({
    defaultValues: {
      ...honorary,
      coverFee,
    },
    resolver: yupResolver(
      schema<FV>({
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

  const withHonorary = watch("withHonorary");
  const withTributeNotif = watch("withTributeNotif");
  const customMsg = watch("tributeNotif.fromMsg");

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className={`grid grid-cols-2 gap-x-4 ${classes}`}
    >
      <CheckField {...register("coverFee")} classes="col-span-full">
        Cover payment processing fees for your donation{" "}
        <span className="text-navy-l1 text-sm">
          (&nbsp;{nonprofitName} receives the full amount&nbsp;)
        </span>
      </CheckField>
      {/*
      {method !== "crypto" && (
        <CheckField {...register("ukTaxResident")} classes="col-span-full mt-4">
          UK Taxpayer? Supercharge your donation with gift aid
        </CheckField>
      )}
      */}

      <CheckField {...register("withHonorary")} classes="col-span-full mt-4">
        Dedicate my donation
      </CheckField>

      {withHonorary && (
        <div className="col-span-full p-4 bg-blue-l5 rounded-lg mt-2 shadow-inner">
          <Field
            {...register("honoraryFullName")}
            label="Honoree's name"
            placeholder="e.g. Jane Doe"
            classes="w-full field-donate [&_input]:bg-white"
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
                {...register("tributeNotif.toFullName")}
                label="Recipient name"
                placeholder="e.g. Jane Doe"
                classes="field-donate [&_label]:text-sm [&_input]:text-sm"
                required
                error={errors.tributeNotif?.toFullName?.message}
              />
              <Field
                {...register("tributeNotif.toEmail")}
                label="Email address"
                placeholder="e.g. janedoe@better.giving"
                classes="field-donate [&_label]:text-sm [&_input]:text-sm"
                required
                error={errors.tributeNotif?.toEmail?.message}
              />
              <Field
                {...register("tributeNotif.fromMsg")}
                rows={2}
                type="textarea"
                label="Custom message"
                placeholder="Message to recipient"
                classes={{
                  container: "field-donate [&_label]:text-sm [&_input]:text-sm",
                }}
                required={false}
                error={errors.tributeNotif?.fromMsg?.message}
              />
              <p
                data-exceed={errors.tributeNotif?.fromMsg?.type === "max"}
                className="text-xs text-navy-l4 -mt-2 data-[exceed='true']:text-red"
              >
                {customMsg.length}/{CUSTOM_MSG_MAX_LENGTH}
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

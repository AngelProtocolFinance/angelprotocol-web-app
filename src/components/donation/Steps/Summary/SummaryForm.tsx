import { yupResolver } from "@hookform/resolvers/yup";
import { Selector } from "components/Selector";
import { CheckField, Field, Form, Label } from "components/form";
import { useForm } from "react-hook-form";
import { schema } from "schemas/shape";
import type { DonateMethodId } from "types/lists";
import { string } from "yup";
import ContinueBtn from "../common/ContinueBtn";
import { initDonorTitleOption } from "../common/constants";
import type { FormDonor, Honorary, Mode } from "../types";

type FV = FormDonor & Honorary;

type Props = {
  onSubmit(formValues: FV): void;
  classes?: string;
  donor: FormDonor;
  honorary: Honorary;
  mode: Mode;
  method: DonateMethodId;
};
const ukTaxResidentKey: keyof FV = "ukTaxResident";
const withHonoraryKey: keyof FV = "withHonorary";
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
  mode,
  method,
}: Props) {
  const methods = useForm<FV>({
    defaultValues: { ...donor, ...honorary },
    resolver: yupResolver(
      schema<FV>({
        firstName: string().required("Please enter your first name"),
        lastName: string().required("Please enter your last name"),
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
      })
    ),
  });

  const { handleSubmit, watch } = methods;
  const ukTaxResident = watch("ukTaxResident");
  const withHonorary = watch("withHonorary");
  const withTributeNotif = watch("withTributeNotif");

  return (
    <Form
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
      className={`grid grid-cols-2 gap-4 ${classes}`}
    >
      <Label className="-mb-2 text-base font-medium">Title</Label>
      <Selector<FV, "title", string>
        name="title"
        options={titleOptions}
        classes={{
          button: "field-input-donate",
          container: "col-span-full",
        }}
      />
      <Field<FV>
        name="firstName"
        label="Your name"
        placeholder="First Name"
        required
        classes={{
          label: "font-semibold text-base font-heading",
          container: "field-donate",
        }}
      />
      <Field<FV>
        name="lastName"
        label=""
        placeholder="Last Name"
        classes={{ container: "field-donate" }}
      />
      <Field<FV>
        name="email"
        label="Your email"
        placeholder="Email address"
        classes={{
          label: "font-medium text-base",
          container: "col-span-full field-donate",
        }}
        required
      />
      {method !== "crypto" && (
        <CheckField<FV> name="ukTaxResident" classes="col-span-full mt-4">
          UK Taxpayer? Supercharge your donation with gift aid
        </CheckField>
      )}
      {ukTaxResident && (
        <>
          <Field<FV>
            name="streetAddress"
            label="House number"
            placeholder="e.g. 100 Better Giving Rd"
            classes={{ container: "col-span-full field-donate" }}
            required
          />
          <Field<FV>
            name="zipCode"
            label="Postal code"
            placeholder="e.g. BG21 1BG"
            classes={{ container: "col-span-full field-donate" }}
            required
          />
        </>
      )}

      <CheckField<FV> name="withHonorary" classes="col-span-full mt-4">
        Dedicate my donation
      </CheckField>

      {withHonorary && (
        <div className="col-span-full p-4 bg-blue-l5 rounded">
          <Field<FV>
            name="honoraryFullName"
            label="Honoree's name"
            placeholder="e.g. Jane Doe"
            classes="w-full field-donate [&_input]:bg-white"
            required
          />
          <CheckField<FV>
            name="withTributeNotif"
            classes="col-span-full mt-2 text-sm"
          >
            Notify someone about this tribute
          </CheckField>

          {withTributeNotif && (
            <div className="grid gap-y-3 mt-4 rounded p-4 bg-white">
              <Field<FV>
                name="tributeNotif.toFullName"
                label="Recipient name"
                placeholder="e.g. Jane Doe"
                classes="field-donate [&_label]:text-sm [&_input]:text-sm"
                required
              />
              <Field<FV>
                name="tributeNotif.toEmail"
                label="Email address"
                placeholder="e.g. Jane Doe"
                classes="field-donate [&_label]:text-sm [&_input]:text-sm"
                required
              />
              <Field<FV, "textarea">
                type="textarea"
                name="tributeNotif.fromMsg"
                label="Custom message"
                placeholder="Message to recipient"
                classes="field-donate [&_label]:text-sm [&_input]:text-sm"
                required={false}
              />
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

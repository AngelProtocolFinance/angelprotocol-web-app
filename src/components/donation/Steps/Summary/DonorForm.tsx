import { yupResolver } from "@hookform/resolvers/yup";
import { Selector } from "components/Selector";
import { CheckField, Field, Form, Label } from "components/form";
import { useForm } from "react-hook-form";
import { schema } from "schemas/shape";
import type { DonateMethodId } from "types/lists";
import { string } from "yup";
import ContinueBtn from "../common/ContinueBtn";
import { initDonorTitleOption } from "../common/constants";
import type { FormDonor, Mode } from "../types";

type FV = FormDonor;

type Props = {
  onSubmit(donor: FV): void;
  classes?: string;
  donor?: FormDonor;
  mode: Mode;
  method: DonateMethodId;
};
const ukTaxResidentKey: keyof FV = "ukTaxResident";
const titleOptions: FV["title"][] = [
  initDonorTitleOption,
  { label: "Mr", value: "Mr" },
  { label: "Mrs", value: "Mrs" },
  { label: "Ms", value: "Ms" },
  { label: "Mx", value: "Mx" },
];

export default function DonorForm({
  classes = "",
  onSubmit,
  donor,
  mode,
  method,
}: Props) {
  const methods = useForm<FV>({
    defaultValues: donor || {
      firstName: "",
      lastName: "",
      email: "",
      ukTaxResident: false,
      title: initDonorTitleOption,
      streetAddress: "",
      zipCode: "",
    },
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
      })
    ),
  });

  const { handleSubmit, watch } = methods;
  const ukTaxResident = watch("ukTaxResident");

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
            classes={{ container: "col-span-full field-donate mt-4" }}
            required
          />
          <Field<FV>
            name="zipCode"
            label="Zip code"
            placeholder="e.g. BG21 1BG"
            classes={{ container: "col-span-full field-donate" }}
            required
          />
        </>
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

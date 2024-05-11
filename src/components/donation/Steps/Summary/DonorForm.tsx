import { yupResolver } from "@hookform/resolvers/yup";
import { Field, Form } from "components/form";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import type { Donor, Donor as FV } from "types/aws";
import { object, string } from "yup";

type Props = {
  onSubmit(donor: FV): void;
  submitBtn: ReactNode;
  disabled?: boolean;
  classes?: string;
  donor?: Donor;
};

export default function DonorForm({
  classes = "",
  onSubmit,
  submitBtn,
  disabled,
  donor,
}: Props) {
  const methods = useForm<FV>({
    defaultValues: donor || { firstName: "", lastName: "", email: "" },
    resolver: yupResolver(
      object({
        firstName: string().required("Please enter your first name"),
        lastName: string().required("Please enter your last name"),
        email: string()
          .required("Please enter your email")
          .email("Please check your email for correctness"),
      })
    ),
  });

  const { handleSubmit } = methods;

  return (
    <Form
      disabled={disabled}
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
      className={`grid grid-cols-2 gap-4 ${classes}`}
    >
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
          container: "col-span-full field-donate mb-6",
        }}
        required
      />
      {submitBtn}
    </Form>
  );
}

import { yupResolver } from "@hookform/resolvers/yup";
import { Field, Form } from "components/form";
import { useForm } from "react-hook-form";
import { Donor, Donor as FV } from "types/aws";
import { object, string } from "yup";

type Props = {
  onSubmit(donor: FV): void;
  classes?: string;
  donor?: Donor;
};

export default function DonorForm({ classes = "", onSubmit, donor }: Props) {
  const methods = useForm<FV>({
    defaultValues: donor || { firstName: "", lastName: "", email: "" },
    resolver: yupResolver(
      object({
        firstName: string().required("required"),
        lastName: string().required("required"),
        email: string().required("required").email("invalid"),
      })
    ),
  });

  const { handleSubmit } = methods;

  return (
    <Form
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
          container: "col-span-full field-donate",
        }}
        required
      />
      <button className="btn-blue btn-donate px-4 col-span-full mt-6">
        Checkout
      </button>
    </Form>
  );
}

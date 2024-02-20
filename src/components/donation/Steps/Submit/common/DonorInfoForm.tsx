import { yupResolver } from "@hookform/resolvers/yup";
import { Field } from "components/form";
import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "yup";
import { Donor as FV } from "../types";

type Props = {
  onSubmit(donor: FV): void;
  classes?: string;
} & ({ render: "update"; donor: FV } | { render: "new"; donor?: never });

export default function DonorInfoForm({
  classes = "",
  onSubmit,
  ...props
}: Props) {
  const methods = useForm<FV>({
    defaultValues:
      props.render === "update"
        ? props.donor
        : { firstName: "", lastName: "", email: "" },
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
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`grid grid-cols-2 gap-4 ${classes}`}
      >
        <Field<FV>
          name="firstName"
          label="Your name"
          required
          classes={{ label: "font-medium text-base" }}
        />
        <Field<FV> name="lastName" label="" />
        <Field<FV>
          name="email"
          label="Your email"
          classes={{
            label: "font-medium text-base",
            container: "col-span-full",
          }}
          required
        />
        <button className="btn-blue normal-case px-4 col-span-full rounded-full mt-6">
          Checkout
        </button>
      </form>
    </FormProvider>
  );
}

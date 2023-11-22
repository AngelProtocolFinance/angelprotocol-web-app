import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { InferType, object, string } from "yup";
import { Field } from "components/form";
import { appRoutes } from "constants/routes";

export default function Signup() {
  const schema = object({
    firstName: string().required("required"),
    lastName: string().required("required"),
    email: string().required("required").email("invalid email"),
    password: string().required("required").min(6, "min 6 characters"),
    passwordConfirmation: string()
      .required("required")
      .when(["password"], ([password], schema) =>
        schema.matches(password, "password doesn't match")
      ),
  });
  type FV = InferType<typeof schema>;
  const methods = useForm<FV>({ resolver: yupResolver(schema) });
  const { handleSubmit } = methods;
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((fv) => {
          console.log(fv);
        })}
        className="py-8 content-start grid justify-self-center gap-6 w-full max-w-sm"
      >
        <Field<FV>
          label="First name"
          name="firstName"
          placeholder="e.g. Alfred"
        />
        <Field<FV> label="Last name" name="lastName" placeholder="e.g. Nobel" />
        <Field<FV>
          label="E-mail address"
          name="email"
          placeholder="e.g. alfrednobel@gmail.com"
        />
        <Field<FV, "password">
          type="password"
          label="Password"
          name="password"
        />
        <Field<FV, "password">
          type="password"
          label="Re-enter password"
          name="passwordConfirmation"
        />
        <button type="submit" className="mt-4 btn-orange font-work">
          Sign up
        </button>

        <p className="text-gray-d1 dark:text-gray text-sm">
          Already a member?{" "}
          <Link className="text-orange" to={appRoutes.signin}>
            Sign in
          </Link>
        </p>
      </form>
    </FormProvider>
  );
}

import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { InferType, object, string } from "yup";
import Icon from "components/Icon";
import { Field } from "components/form";
import { appRoutes } from "constants/routes";

export default function Login() {
  return (
    <div className="grid content-start justify-items-center py-8">
      <LoginForm classes="" />
    </div>
  );
}

function LoginForm({ classes = "" }) {
  const schema = object({
    email: string().required("required").email("invalid email"),
    password: string().required("required").min(6, "min 6 characters"),
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
        className={classes + " grid gap-4 w-full max-w-sm"}
      >
        <Field<FV> label="E-mail address" name="email" />
        <Field<FV, "password">
          type="password"
          label="Password"
          name="password"
        />
        <button type="submit" className="mt-3 btn-orange font-work">
          Sign in
        </button>

        <button
          type="button"
          className="mt-8 dark:bg-white dark:border-white rounded border-2 border-[#DB4437] hover:bg-[#DB4437]/10 text-[#DB4437] p-2 flex items-center gap-2 uppercase font-bold text-sm"
        >
          <Icon size={24} type="Google" />
          <span>Login with google</span>
        </button>

        <p className="text-gray-d1 dark:text-gray text-sm">
          Don't have an account?{" "}
          <Link className="text-orange" to={appRoutes.signin}>
            Create one
          </Link>
        </p>
      </form>
    </FormProvider>
  );
}

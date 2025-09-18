import { valibotResolver } from "@hookform/resolvers/valibot";
import { Input } from "components/form";
import { appRoutes } from "constants/routes";
import { Mail } from "lucide-react";
import { Link, useFetcher } from "react-router";
import { useRemixForm } from "remix-hook-form";
import { type IEmailSchema, email_schema } from "./schema";

type Props = { to: string };

export default function InitForm(props: Props) {
  const fetcher = useFetcher();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useRemixForm<IEmailSchema>({
    resolver: valibotResolver(email_schema),
  });

  return (
    <fetcher.Form
      method="POST"
      onSubmit={handleSubmit}
      className="grid w-full max-w-md px-6 sm:px-7 py-7 sm:py-8 bg-white border border-gray-l3 rounded-2xl"
    >
      <h3 className="text-center text-xl sm:text-2xl font-bold text-gray-d4">
        Reset your Password
      </h3>
      <p className="mt-2 text-center font-normal max-sm:text-sm">
        Enter your registered email to reset password
      </p>

      <Input
        {...register("email")}
        placeholder="Email address"
        classes={{ container: "mt-6" }}
        icon={Mail}
        error={errors.email?.message}
      />

      <button
        disabled={fetcher.state !== "idle"}
        type="submit"
        className="mt-6 w-full h-12 sm:h-[52px] flex-center btn-blue rounded-full normal-case sm:text-lg font-bold"
      >
        Send Code
      </button>

      <Link
        to={appRoutes.signin + `?redirect=${props.to}`}
        className="mt-5 text-blue-d1 hover:text-blue active:text-blue-d2 aria-disabled:text-gray max-sm:text-sm font-medium underline text-center"
        aria-disabled={fetcher.state !== "idle"}
      >
        Back to Sign in
      </Link>
    </fetcher.Form>
  );
}

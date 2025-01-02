import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Input } from "components/form";
import { parseWithValibot } from "conform-to-valibot";
import { appRoutes } from "constants/routes";
import { toWithState } from "helpers/state-params";
import { Mail } from "lucide-react";
import { Link, useFetcher } from "react-router";
import { type ActionData, isFormErr } from "types/action";
import { emailSchema } from "./schema";

type Props = { state: unknown };

export default function InitForm(props: Props) {
  const fetcher = useFetcher<ActionData<string>>();
  const [form, fields] = useForm({
    shouldRevalidate: "onInput",
    lastResult: isFormErr(fetcher.data) ? fetcher.data : undefined,
    onValidate({ formData }) {
      return parseWithValibot(formData, { schema: emailSchema });
    },
  });

  return (
    <fetcher.Form
      {...getFormProps(form)}
      className="grid w-full max-w-md px-6 sm:px-7 py-7 sm:py-8 bg-white border border-gray-l4 rounded-2xl"
    >
      <h3 className="text-center text-xl sm:text-2xl font-bold text-navy-d4">
        Reset your Password
      </h3>
      <p className="mt-2 text-center font-normal max-sm:text-sm">
        Enter your registered email to reset password
      </p>

      <Input
        {...getInputProps(fields.email, { type: "email" })}
        placeholder="Email address"
        classes={{ container: "mt-6" }}
        icon={Mail}
        error={fields.email.errors?.[0]}
      />

      <button
        type="submit"
        className="mt-6 w-full h-12 sm:h-[52px] flex-center bg-blue-d1 disabled:bg-gray text-white enabled:hover:bg-blue enabled:active:bg-blue-d2 rounded-full normal-case sm:text-lg font-bold"
      >
        Send Code
      </button>

      <Link
        to={toWithState(appRoutes.signin, props.state)}
        className="mt-5 text-blue-d1 hover:text-blue active:text-blue-d2 aria-disabled:text-gray max-sm:text-sm font-medium underline text-center"
        aria-disabled={fetcher.state !== "idle"}
      >
        Back to Sign in
      </Link>
    </fetcher.Form>
  );
}

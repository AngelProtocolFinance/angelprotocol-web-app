import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "@vercel/remix";
import { Separator } from "components/Separator";
import { NativeField as Field } from "components/form";
import { parseWithValibot } from "conform-to-valibot";
import { regCookie } from "../data/cookie";
import { getRegState } from "../data/step-loader";
import { nextStep } from "../routes";
import { schema } from "./types";
import { cognito, toAuth } from ".server/auth";

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const { user, headers } = await cognito.retrieve(cookieHeader);
  if (!user) return toAuth(request, headers);

  const rc = await regCookie.parse(cookieHeader).then((x) => x || {});
  return rc.reference || null;
};

export const action: ActionFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const fv = await request.formData();
  const parsed = parseWithValibot(fv, { schema });
  if (parsed.status !== "success") return parsed.reply();

  const { data, step } = await getRegState(parsed.value.reference, user);
  return redirect(`../${data.init.id}/${nextStep[step]}`);
};

export { ErrorBoundary } from "components/error";
export default function Form({ classes = "" }: { classes?: string }) {
  const prev = useLoaderData();
  const fetcher = useFetcher();
  const [form, fields] = useForm({
    shouldRevalidate: "onSubmit",
    onValidate({ formData }) {
      return parseWithValibot(formData, { schema });
    },
    defaultValue: { reference: prev || "" },
  });
  return (
    <fetcher.Form
      method="POST"
      {...getFormProps(form)}
      className={`${classes} grid padded-container w-full max-w-[37.5rem]`}
    >
      <h3 className="text-3xl text-center">Resume registration</h3>
      <p className="text-center mt-2 text-navy-l1 dark:text-navy-l4 text-lg">
        Enter your registration reference to resume where you left off
      </p>

      <Field
        {...getInputProps(fields.reference, { type: "text" })}
        label="Registration reference"
        placeholder="e.g. 00000000-0000-0000-0000-000000000000"
        classes={{ container: "mt-8 mx-0 sm:mx-24" }}
        error={fields.reference.errors?.at(0)}
      />

      <button
        type="submit"
        className="mt-8 mx-0 sm:mx-24 btn-blue btn-reg"
        disabled={fetcher.state !== "idle"}
      >
        Resume
      </button>
      <Separator classes="my-11 mx-0 sm:mx-24 before:mr-2 after:ml-2">
        OR
      </Separator>
      <Link
        className="mx-0 sm:mx-24 btn-outline-filled btn-reg"
        to=".."
        aria-disabled={fetcher.state !== "idle"}
      >
        Register new account
      </Link>
    </fetcher.Form>
  );
}

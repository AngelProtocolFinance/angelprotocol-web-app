import { Progress } from "@better-giving/reg/progress";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "@vercel/remix";
import { Field } from "components/form";
import { Separator } from "components/separator";
import { parseWithValibot } from "conform-to-valibot";
import { schema } from "./types";
import { cognito, toAuth } from ".server/auth";
import { regdb } from ".server/aws/db";
import { reg_cookie } from ".server/cookie";

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const { user, headers } = await cognito.retrieve(cookieHeader);
  if (!user) return toAuth(request, headers);

  const rc = await reg_cookie.parse(cookieHeader).then((x) => x || {});
  return rc.reference || null;
};

export const action: ActionFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const fv = await request.formData();
  const parsed = parseWithValibot(fv, { schema });
  if (parsed.status !== "success") return parsed.reply();

  const reg = await regdb.reg(parsed.value.reference);
  if (!reg) return { status: 404 };

  /** set existing reference user inputs */
  const rc = await reg_cookie
    .parse(request.headers.get("Cookie"))
    .then((x) => x || {});
  rc.reference = reg.id;

  return redirect(`../${reg.id}/${new Progress(reg).step}`, {
    headers: {
      "Set-Cookie": await reg_cookie.serialize(rc),
    },
  });
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
      className={`${classes} grid px-5 w-full max-w-2xl`}
    >
      <h3 className="text-3xl text-center">Resume registration</h3>
      <p className="text-center mt-2 text-gray dark:text-gray-l1 text-lg">
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
        className="mt-8 mx-0 sm:mx-24 btn btn-blue text-sm"
        disabled={fetcher.state !== "idle"}
      >
        Resume
      </button>
      <Separator classes="my-11 mx-0 sm:mx-24 before:mr-2 after:ml-2">
        OR
      </Separator>
      <Link
        className="mx-0 sm:mx-24 btn-outline btn text-sm"
        to=".."
        aria-disabled={fetcher.state !== "idle"}
      >
        Register new account
      </Link>
    </fetcher.Form>
  );
}

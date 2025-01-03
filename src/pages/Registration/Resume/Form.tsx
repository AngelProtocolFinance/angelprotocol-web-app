import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { loadAuth, redirectToAuth } from "auth";
import { Separator } from "components/Separator";
import { NativeField as Field } from "components/form";
import { parseWithValibot } from "conform-to-valibot";
import { type ActionFunction, Link, redirect, useFetcher } from "react-router";
import { getRegState } from "../data/step-loader";
import { nextStep } from "../routes";
import { schema } from "./types";

export const clientAction: ActionFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const fv = await request.formData();
  const parsed = parseWithValibot(fv, { schema });
  if (parsed.status !== "success") return parsed.reply();

  const { data, step } = await getRegState(parsed.value.reference, auth);
  return redirect(`../${data.init.id}/${nextStep[step]}`);
};

export default function Form({ classes = "" }: { classes?: string }) {
  const fetcher = useFetcher();
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithValibot(formData, { schema });
    },
    defaultValue: { reference: "" },
  });
  return (
    <fetcher.Form
      action="."
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

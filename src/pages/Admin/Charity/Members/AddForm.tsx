import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { NativeField as Field } from "components/form";
import { parseWithValibot } from "conform-to-valibot";
import { useFetcher, useNavigate, useRouteLoaderData } from "react-router-dom";
import { isValiErr } from "types/action";
import type { EndowAdmin } from "types/aws";
import { schema } from "./schema";

export function AddForm() {
  const navigate = useNavigate();
  return (
    <Dialog
      open={true}
      onClose={() =>
        navigate("..", { preventScrollReset: true, replace: true })
      }
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 data-[closed]:opacity-0" />
      <Content />
    </Dialog>
  );
}

function Content() {
  const members = useRouteLoaderData("endow-admins") as EndowAdmin[];
  const fetcher = useFetcher();
  const [form, fields] = useForm({
    lastResult: isValiErr(fetcher.data) ? fetcher.data : undefined,
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithValibot(formData, {
        schema: schema(members.map((x) => x.email)),
      });
    },
  });

  return (
    <DialogPanel
      {...getFormProps(form)}
      method="post"
      action="."
      as={fetcher.Form}
      className="p-6 fixed-center z-10 grid gap-4 text-navy-d4 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden"
    >
      <h4 className="text-center text-xl font-bold mb-4">Invite User</h4>
      <Field
        {...getInputProps(fields.email, { type: "email" })}
        label="Email"
        required
        error={fields.email.errors?.[0]}
      />
      <Field
        {...getInputProps(fields.firstName, { type: "text" })}
        label="First name"
        required
        error={fields.firstName.errors?.[0]}
      />
      <Field
        {...getInputProps(fields.lastName, { type: "text" })}
        label="Last name"
        error={fields.lastName.errors?.[0]}
        required
      />
      <button disabled={fetcher.state !== "idle"} className="btn-blue mt-6">
        Add member
      </button>
    </DialogPanel>
  );
}

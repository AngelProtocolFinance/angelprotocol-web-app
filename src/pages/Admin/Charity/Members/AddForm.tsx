import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { useNavigate, useRouteLoaderData } from "@remix-run/react";
import { Modal } from "components/Modal";
import { NativeField as Field, RmxForm, useRmxForm } from "components/form";
import { parseWithValibot } from "conform-to-valibot";
import { isFormErr } from "types/action";
import type { LoaderData } from "./api";
import { schema } from "./schema";

export { addAction as action } from "./api";
export { ErrorModal as ErrorBoundary } from "components/error";
export default function AddForm() {
  const navigate = useNavigate();
  return (
    <Modal
      open={true}
      onClose={() =>
        navigate("..", { preventScrollReset: true, replace: true })
      }
      classes="p-6 fixed-center z-10 text-navy-d4 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded-sm overflow-hidden"
    >
      <Content />
    </Modal>
  );
}

function Content() {
  const ldta = useRouteLoaderData<LoaderData>("endow-admins");
  const { admins = [] } = ldta ?? {};
  const { data, nav } = useRmxForm();
  const [form, fields] = useForm({
    lastResult: isFormErr(data) ? data : undefined,
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithValibot(formData, {
        schema: schema(admins.map((x) => x.email)),
      });
    },
  });

  return (
    <RmxForm
      {...getFormProps(form)}
      disabled={nav.state !== "idle"}
      method="POST"
      className="w-full grid gap-4"
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
      <button disabled={nav.state !== "idle"} className="btn-blue mt-6">
        Add member
      </button>
    </RmxForm>
  );
}

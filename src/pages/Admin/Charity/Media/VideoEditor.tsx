import { httpsUrl } from "@better-giving/endowment/schema";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "@remix-run/react";
import { Modal } from "components/Modal";
import { NativeField as Field, RmxForm, useRmxForm } from "components/form";
import { parseWithValibot } from "conform-to-valibot";
import { X } from "lucide-react";
import { isFormErr } from "types/action";
import { nonEmpty, object, pipe } from "valibot";

type Props = {
  edit?: { prevUrl: string; mediaId: string };
};

export const schema = object({ url: pipe(httpsUrl, nonEmpty("required")) });

export default function VideoEditor() {
  const [params] = useSearchParams();
  const { mediaId } = useParams();

  const navigate = useNavigate();
  return (
    <Modal
      open={true}
      onClose={() =>
        navigate("..", { preventScrollReset: true, replace: true })
      }
      classes="fixed-center z-10 grid text-navy-d4 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded-sm overflow-hidden"
    >
      <Content
        edit={
          mediaId ? { prevUrl: params.get("prev_url")!, mediaId } : undefined
        }
      />
    </Modal>
  );
}

function Content(props: Props) {
  const { nav, data } = useRmxForm();
  const [form, fields] = useForm({
    lastResult: isFormErr(data) ? data : undefined,
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithValibot(formData, {
        schema,
      });
    },
    defaultValue: {
      url: props.edit?.prevUrl ?? "",
    },
  });

  return (
    <RmxForm
      method="POST"
      disabled={nav.state !== "idle"}
      {...getFormProps(form)}
    >
      <div className="relative">
        <p className="text-xl font-bold text-center border-b bg-blue-l5 dark:bg-blue-d7 border-gray-l4 p-5">
          {props.edit ? "Edit" : "Add"} video
        </p>
        <Link
          to=".."
          aria-disabled={nav.state !== "idle"}
          className="border border-gray-l4 p-2 rounded-md absolute top-1/2 right-4 transform -translate-y-1/2 aria-disabled:text-navy-l5"
        >
          <X size={24} />
        </Link>
      </div>
      <div className="p-4">
        <Field
          {...getInputProps(fields.url, { type: "url" })}
          placeholder="e.g. https://youtu.be/XOUjJqQ68Ec?si=-WX60lgPXUWAXPCY"
          label="Web Address (URL)"
          error={fields.url.errors?.[0]}
          required
        />
      </div>

      <div className="mt-4 p-3 sm:px-8 sm:py-4 flex items-center justify-end gap-4 w-full text-center sm:text-right bg-blue-l4 dark:bg-blue-d7 border-t border-gray-l4">
        <Link to=".." className="btn-outline-filled text-sm px-8 py-2">
          Cancel
        </Link>
        <button
          disabled={!form.dirty}
          type="submit"
          className="btn-blue px-8 py-2 text-sm"
        >
          Continue
        </button>
      </div>
    </RmxForm>
  );
}

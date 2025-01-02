import { httpsUrl } from "@better-giving/endowment/schema";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { NativeField as Field } from "components/form";
import { parseWithValibot } from "conform-to-valibot";
import { X } from "lucide-react";
import {
  Link,
  useFetcher,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
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
    <Dialog
      open={true}
      onClose={() =>
        navigate("..", { preventScrollReset: true, replace: true })
      }
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 data-[closed]:opacity-0" />
      <Content
        edit={
          mediaId ? { prevUrl: params.get("prev_url")!, mediaId } : undefined
        }
      />
    </Dialog>
  );
}

function Content(props: Props) {
  const fetcher = useFetcher();
  const [form, fields] = useForm({
    lastResult: isFormErr(fetcher.data) ? fetcher.data : undefined,
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
    <DialogPanel
      as={fetcher.Form}
      action="."
      method="POST"
      {...getFormProps(form)}
      className="fixed-center z-10 grid text-navy-d4 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden"
    >
      <div className="relative">
        <p className="text-xl font-bold text-center border-b bg-blue-l5 dark:bg-blue-d7 border-gray-l4 p-5">
          {props.edit ? "Edit" : "Add"} video
        </p>
        <Link
          to=".."
          aria-disabled={fetcher.state !== "idle"}
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
          disabled={!form.dirty || fetcher.state !== "idle"}
          type="submit"
          className="btn-blue px-8 py-2 text-sm"
        >
          Continue
        </button>
      </div>
    </DialogPanel>
  );
}

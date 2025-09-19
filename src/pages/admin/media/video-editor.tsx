import { Field, RmxForm } from "components/form";
import { Modal } from "components/modal";
import { X } from "lucide-react";
import {
  Link,
  useNavigate,
  useNavigation,
  useParams,
  useSearchParams,
} from "react-router";
import { useRemixForm } from "remix-hook-form";
import type { ISchema } from "./schema";

export default function Page() {
  const [sp] = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();

  return (
    <Modal
      open={true}
      onClose={() =>
        navigate("..", { preventScrollReset: true, replace: true })
      }
      classes="fixed-center z-10 grid text-gray-d4 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded-sm overflow-hidden"
    >
      <Content
        action={params.mediaId ? "edit" : "add"}
        prev_url={sp.get("prev_url")}
      />
    </Modal>
  );
}

interface IProps {
  action: "edit" | "add";
  prev_url: string | null;
}

function Content(props: IProps) {
  const nav = useNavigation();
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useRemixForm<ISchema>({
    defaultValues: { url: props.prev_url ?? "" },
  });

  return (
    <RmxForm
      method="POST"
      disabled={nav.state !== "idle"}
      onSubmit={handleSubmit}
    >
      <div className="relative">
        <p className="text-xl capitalize font-bold text-center border-b bg-blue-l5 dark:bg-blue-d7 border-gray-l3 p-5">
          {props.action} video
        </p>
        <Link
          to=".."
          aria-disabled={nav.state !== "idle"}
          className="border border-gray-l3 p-2 rounded-md absolute top-1/2 right-4 transform -translate-y-1/2 aria-disabled:text-gray-l2"
        >
          <X size={24} />
        </Link>
      </div>
      <div className="p-4">
        <Field
          {...register("url")}
          placeholder="e.g. https://youtu.be/XOUjJqQ68Ec?si=-WX60lgPXUWAXPCY"
          label="Web Address (URL)"
          error={errors.url?.message}
          required
        />
      </div>

      <div className="mt-4 p-3 sm:px-8 sm:py-4 flex items-center justify-end gap-4 w-full text-center sm:text-right bg-blue-l4 dark:bg-blue-d7 border-t border-gray-l3">
        <Link to=".." className="btn-outline btn text-sm px-8 py-2">
          Cancel
        </Link>
        <button
          disabled={!isDirty}
          type="submit"
          className="btn btn-blue px-8 py-2 text-sm"
        >
          Continue
        </button>
      </div>
    </RmxForm>
  );
}

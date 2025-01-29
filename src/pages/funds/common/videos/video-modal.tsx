import { valibotResolver } from "@hookform/resolvers/valibot";
import { NativeField as Field } from "components/form";
import { Modal } from "components/modal";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { object } from "valibot";
import { videoUrl } from "./types";

interface IVideoModal {
  onSubmit: (url: string) => void;
  initUrl?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function VideoModal(props: IVideoModal) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: valibotResolver(object({ url: videoUrl })),
    defaultValues: { url: props.initUrl ?? "" },
  });

  return (
    <Modal
      open={props.open}
      onClose={() => props.setOpen(false)}
      classes="fixed-center z-10 grid text-gray-d4 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded-sm overflow-hidden"
    >
      <form
        className="contents"
        onSubmit={handleSubmit(async (fv) => {
          props.onSubmit(fv.url);
        })}
      >
        <div className="relative">
          <p className="text-xl font-bold text-center border-b bg-blue-l5 dark:bg-blue-d7 border-gray-l3 p-5">
            {props.initUrl ? "Edit" : "Add"} video
          </p>
          <button
            onClick={() => props.setOpen(false)}
            className="border border-gray-l3 p-2 rounded-md absolute top-1/2 right-4 transform -translate-y-1/2 disabled:text-gray-l2 dark:disabled:text-gray-d3 dark:disabled:border-gray-d3"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-4">
          <Field
            {...register("url")}
            placeholder="e.g. https://youtu.be/XOUjJqQ68Ec?si=-WX60lgPXUWAXPCY"
            name="url"
            label="Web Address (URL)"
            required
            error={errors.url?.message}
          />
        </div>

        <div className="mt-4 p-3 sm:px-8 sm:py-4 flex items-center justify-end gap-4 w-full text-center sm:text-right bg-blue-l4 dark:bg-blue-d7 border-t border-gray-l3">
          <button
            type="button"
            className="btn-outline-filled text-sm px-8 py-2"
            onClick={() => props.setOpen(false)}
          >
            Cancel
          </button>
          <button
            disabled={!isDirty}
            type="submit"
            className="btn btn-blue px-8 py-2 text-sm"
          >
            Continue
          </button>
        </div>
      </form>
    </Modal>
  );
}

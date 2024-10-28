import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "components/Modal";
import Prompt from "components/Prompt";
import { Field, RhfForm } from "components/form";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { X } from "lucide-react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { url } from "schemas/string";
import {
  useEditMediumMutation,
  useNewMediumMutation,
} from "services/aws/media";
import { object } from "yup";
import { useAdminContext } from "../../Context";

type Props = {
  edit?: { prevUrl: string; mediaId: string };
};

export default function VideoEditor(props: Props) {
  const { id } = useAdminContext();
  const { showModal, closeModal, isDismissible } = useModalContext();
  const [createMedium, { isLoading: creating }] = useNewMediumMutation();
  const [editMedium, { isLoading: editing }] = useEditMediumMutation();
  const { handleError } = useErrorContext();

  const methods = useForm({
    resolver: yupResolver(object({ url: url.required("required") })),
    defaultValues: {
      url: props.edit?.prevUrl ?? "",
    },
  });

  type FV = typeof methods extends UseFormReturn<infer U> ? U : never;
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  return (
    <Modal
      disabled={creating || editing}
      onSubmit={handleSubmit(async (fv) => {
        try {
          const request = props.edit
            ? editMedium({
                endowId: id,
                mediaId: props.edit.mediaId,
                url: fv.url,
              })
            : createMedium({ endowId: id, newUrl: fv.url });
          await request.unwrap();
          showModal(Prompt, {
            type: "success",
            children: `Successfully ${
              props.edit ? "updated" : "created"
            } media`,
          });
        } catch (err) {
          handleError(err, {
            context: `${props.edit ? "editing" : "creating"} media`,
          });
        }
      })}
      as={RhfForm}
      methods={methods}
      className="fixed-center z-10 grid text-navy-d4 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden"
    >
      <div className="relative">
        <p className="text-xl font-bold text-center border-b bg-blue-l5 dark:bg-blue-d7 border-gray-l4 p-5">
          {props.edit ? "Edit" : "Add"} video
        </p>
        {isDismissible && (
          <button
            onClick={closeModal}
            className="border border-gray-l4 p-2 rounded-md absolute top-1/2 right-4 transform -translate-y-1/2 disabled:text-navy-l5 dark:disabled:text-navy-d3 disabled:dark:border-navy-d3"
          >
            <X size={24} />
          </button>
        )}
      </div>
      <div className="p-4">
        <Field<FV>
          placeholder="e.g. https://youtu.be/XOUjJqQ68Ec?si=-WX60lgPXUWAXPCY"
          name="url"
          label="Web Address (URL)"
          required
        />
      </div>

      <div className="mt-4 p-3 sm:px-8 sm:py-4 flex items-center justify-end gap-4 w-full text-center sm:text-right bg-blue-l4 dark:bg-blue-d7 border-t border-gray-l4">
        <button
          type="button"
          className="btn-outline-filled text-sm px-8 py-2"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          disabled={!isDirty}
          type="submit"
          className="btn-blue px-8 py-2 text-sm"
        >
          Continue
        </button>
      </div>
    </Modal>
  );
}

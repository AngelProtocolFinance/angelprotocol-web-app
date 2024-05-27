import { yupResolver } from "@hookform/resolvers/yup";
import Icon from "components/Icon";
import Modal from "components/Modal";
import { Field, Form } from "components/form";
import { useModalContext } from "contexts/ModalContext";
import { type UseFormReturn, useForm } from "react-hook-form";
import { object, string } from "yup";

export default function VideoAdder() {
  const { closeModal, isDismissible } = useModalContext();

  const methods = useForm({
    resolver: yupResolver(
      object({ url: string().required().url("invalid url") })
    ),
    defaultValues: {
      url: "",
    },
  });

  type FV = typeof methods extends UseFormReturn<infer U> ? U : never;

  return (
    <Modal className="fixed-center z-10 grid text-navy-d4 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden">
      <div className="relative">
        <p className="text-xl font-bold text-center border-b bg-blue-l5 dark:bg-blue-d7 border-gray-l4 p-5">
          Add video
        </p>
        {isDismissible && (
          <button
            onClick={closeModal}
            className="border border-gray-l4 p-2 rounded-md absolute top-1/2 right-4 transform -translate-y-1/2 disabled:text-navy-l5 dark:disabled:text-navy-d3 disabled:dark:border-navy-d3"
          >
            <Icon type="Close" size={24} />
          </button>
        )}
      </div>
      <Form methods={methods} className="">
        <Field<FV> name="url" label="Web Address (URL)" required />
        <div className="p-3 sm:px-8 sm:py-4 flex items-center justify-end gap-4 w-full text-center sm:text-right bg-blue-l4 dark:bg-blue-d7 border-t border-gray-l4">
          <button
            type="button"
            className="btn-outline-filled text-sm px-8 py-2"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button type="submit" className="btn-blue px-8 py-2 text-sm">
            Continue
          </button>
        </div>
      </Form>
    </Modal>
  );
}

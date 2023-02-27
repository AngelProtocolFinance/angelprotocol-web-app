import { Dialog } from "@headlessui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useModalContext } from "contexts/ModalContext";
import { Field } from "components/form";

type Props = {
  name: string;
  onAdd(address: string): void;
};
export default function MemberForm({ onAdd, name }: Props) {
  const { closeModal } = useModalContext();
  const methods = useForm();
  const { handleSubmit } = methods;
  return (
    <Dialog.Panel
      onSubmit={handleSubmit(({ addr }) => {
        onAdd(addr);
        closeModal();
      })}
      as="form"
      className="p-6 fixed-center z-10 grid gap-4 text-gray-d2 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden"
    >
      <FormProvider {...methods}>
        <Field name="addr" label="Address" required />
      </FormProvider>
      <button type="submit" className="btn btn-orange">
        Add {name}
      </button>
    </Dialog.Panel>
  );
}

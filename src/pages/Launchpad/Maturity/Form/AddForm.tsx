import { Dialog } from "@headlessui/react";
import { FormProvider, useForm } from "react-hook-form";
import { Beneficiary } from "../types";
import { useModalContext } from "contexts/ModalContext";
import { Field } from "components/form";

type Props = {
  //also pass remaning share for validation
  onAdd(beneficiary: Beneficiary): void;
};
export default function AddForm({ onAdd }: Props) {
  const { closeModal } = useModalContext();
  const methods = useForm();
  const { handleSubmit } = methods;
  return (
    <Dialog.Panel
      onSubmit={handleSubmit(({ addr, share }) => {
        onAdd({ addr, share });
        closeModal();
      })}
      as="form"
      className="p-6 fixed-center z-10 grid gap-4 text-gray-d2 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden"
    >
      <FormProvider {...methods}>
        <Field name="addr" label="Address" required />
        <Field name="share" label="Share" required />
      </FormProvider>
      <button type="submit" className="btn btn-orange">
        Add beneficiary
      </button>
    </Dialog.Panel>
  );
}

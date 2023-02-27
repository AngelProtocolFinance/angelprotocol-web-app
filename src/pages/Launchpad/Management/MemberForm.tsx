import { Dialog } from "@headlessui/react";
import { FormProvider, useForm } from "react-hook-form";
import { CW4Member } from "types/contracts";
import { useModalContext } from "contexts/ModalContext";
import { Field } from "components/form";

type Props = {
  onAdd(member: CW4Member): void;
};
export default function MemberForm({ onAdd }: Props) {
  const { closeModal } = useModalContext();
  const methods = useForm();
  const { handleSubmit } = methods;
  return (
    <Dialog.Panel
      onSubmit={handleSubmit(({ addr, weight }) => {
        onAdd({ addr, weight });
        closeModal();
      })}
      as="form"
      className="p-6 fixed-center z-10 grid gap-4 text-gray-d2 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden"
    >
      <FormProvider {...methods}>
        <Field name="addr" label="Member address" required />
        <Field name="weight" label="Member weight" required />
      </FormProvider>
      <button type="submit" className="btn btn-orange">
        Add member
      </button>
    </Dialog.Panel>
  );
}

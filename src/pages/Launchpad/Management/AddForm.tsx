import { Dialog } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object } from "yup";
import { SchemaShape } from "schemas/types";
import { Member } from "slices/launchpad/types";
import { useModalContext } from "contexts/ModalContext";
import { Field } from "components/form";
import { requiredPositiveNumber } from "schemas/number";
import { requiredWalletAddr } from "schemas/string";

type Props = {
  added: string[];
  onAdd(member: Member): void;
};

type FV = Member;

export default function AddForm({ onAdd, added }: Props) {
  const { closeModal } = useModalContext();
  const methods = useForm<FV>({
    defaultValues: { addr: "", weight: "1" },
    resolver: yupResolver(
      object().shape<SchemaShape<FV>>({
        addr: requiredWalletAddr().notOneOf(added, "address already added"),
        weight: requiredPositiveNumber,
      })
    ),
  });
  const { handleSubmit } = methods;

  const submit: SubmitHandler<FV> = (data) => {
    onAdd(data);
    closeModal();
  };

  return (
    <Dialog.Panel
      onSubmit={handleSubmit(submit)}
      as="form"
      className="p-6 fixed-center z-10 grid gap-4 text-gray-d2 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden"
    >
      <FormProvider {...methods}>
        <Field name="addr" label="Member address" required />
        <Field name="weight" label="Member weight" required />
      </FormProvider>
      <button type="submit" className="btn btn-orange mt-6">
        Add member
      </button>
    </Dialog.Panel>
  );
}

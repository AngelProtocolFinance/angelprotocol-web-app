import { Dialog } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { object } from "yup";
import { useModalContext } from "contexts/ModalContext";
import { Field } from "components/form";
import { requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";

type Props = {
  added: string[]; //map at modal opening
  onAdd(beneficiary: string): void;
};

type FV = { addr: string };

export default function AddForm({ onAdd, added }: Props) {
  const { closeModal } = useModalContext();

  const methods = useForm<FV>({
    resolver: yupResolver(
      object({
        addr: requiredWalletAddr(chainIds.polygon).notOneOf(
          added,
          "address already added"
        ),
      })
    ),
    defaultValues: {
      addr: "",
    },
  });
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
      <button type="submit" className="btn btn-orange mt-6 text-sm">
        Add beneficiary
      </button>
    </Dialog.Panel>
  );
}

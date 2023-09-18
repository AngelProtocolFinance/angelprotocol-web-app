import { yupResolver } from "@hookform/resolvers/yup";
import { chainIds } from "constant/chainIds";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object } from "yup";
import { useModalContext } from "contexts/ModalContext";
import Modal from "components/Modal";
import { Field } from "components/form";
import { requiredWalletAddr } from "schemas/string";

export type Props = {
  added: string[];
  onAdd(member: string): void;
};

type FV = { addr: string };

export default function AddForm({ onAdd, added }: Props) {
  const { closeModal } = useModalContext();
  const methods = useForm<FV>({
    defaultValues: { addr: "" },
    resolver: yupResolver(
      object({
        addr: requiredWalletAddr(chainIds.polygon).notOneOf(
          added,
          "address already added"
        ),
      })
    ),
  });
  const { handleSubmit } = methods;

  const submit: SubmitHandler<FV> = (data) => {
    onAdd(data.addr);
    closeModal();
  };

  return (
    <Modal
      onSubmit={handleSubmit(submit)}
      as="form"
      className="p-6 fixed-center z-10 grid gap-4 text-gray-d2 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden"
    >
      <FormProvider {...methods}>
        <Field<FV> name="addr" label="Member address" required />
      </FormProvider>
      <button type="submit" className="btn btn-orange mt-6">
        Add member
      </button>
    </Modal>
  );
}

import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object } from "yup";
import { useModalContext } from "contexts/ModalContext";
import Modal from "components/Modal";
import { Field } from "components/form";
import { requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";

export type Props = {
  initial?: string;
  added: string[];
  onChange(member: string): void;
};

type FV = { addr: string };

export default function MemberForm({ onChange, added, initial }: Props) {
  const { closeModal } = useModalContext();
  const isEdit = initial !== undefined;
  const methods = useForm<FV>({
    defaultValues: initial ? { addr: initial } : { addr: "" },
    resolver: yupResolver(
      object({
        addr: requiredWalletAddr(chainIds.polygon).notOneOf(
          initial ? [] : added,
          "address already added"
        ),
      })
    ),
  });
  const { handleSubmit } = methods;

  const submit: SubmitHandler<FV> = (data) => {
    onChange(data.addr);
    closeModal();
  };

  return (
    <Modal
      onSubmit={handleSubmit(submit)}
      as="form"
      className="p-6 fixed-center z-10 grid gap-4 text-gray-d2 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden"
    >
      <FormProvider {...methods}>
        <Field<FV>
          name="addr"
          label="Member address"
          required
          disabled={isEdit}
        />
      </FormProvider>
      <button type="submit" className="btn btn-orange mt-6">
        Add member
      </button>
    </Modal>
  );
}

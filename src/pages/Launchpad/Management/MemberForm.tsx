import { Dialog } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object } from "yup";
import { SchemaShape } from "schemas/types";
import { Member } from "slices/launchpad/types";
import { useModalContext } from "contexts/ModalContext";
import { Field } from "components/form";
import { useGetter } from "store/accessors";
import { requiredPositiveNumber } from "schemas/number";
import { requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";

export type Props = {
  initial?: Member;
  added: string[];
  onChange(member: Member): void;
};

type FV = Member;

export default function MemberForm({ onChange, added, initial }: Props) {
  const network = useGetter((state) => state.launchpad.network);
  const { closeModal } = useModalContext();
  const isEdit = initial !== undefined;
  const methods = useForm<FV>({
    defaultValues: initial || { addr: "", weight: "1" },
    resolver: yupResolver(
      object().shape<SchemaShape<FV>>({
        addr: requiredWalletAddr(
          network === "juno" ? chainIds.juno : chainIds.polygon
        ).notOneOf(initial ? [] : added, "address already added"),
        weight: requiredPositiveNumber,
      })
    ),
  });
  const { handleSubmit } = methods;

  const submit: SubmitHandler<FV> = (data) => {
    onChange(data);
    closeModal();
  };

  return (
    <Dialog.Panel
      onSubmit={handleSubmit(submit)}
      as="form"
      className="p-6 fixed-center z-10 grid gap-4 text-gray-d2 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden"
    >
      <FormProvider {...methods}>
        <Field name="addr" label="Member address" required disabled={isEdit} />
        <Field name="weight" label="Member weight" required />
      </FormProvider>
      <button type="submit" className="btn btn-orange mt-6">
        Add member
      </button>
    </Dialog.Panel>
  );
}

import { Dialog } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { object } from "yup";
import { ProposalBase } from "../../../types";
import { TxType } from "./types";
import { SchemaShape } from "schemas/types";
import { useModalContext } from "contexts/ModalContext";
import { Field } from "components/form";
import { proposalShape } from "../../../constants";

type Props = {
  type: TxType;
  appId: number;
};

type FV = ProposalBase;
export default function Proposer({ type, appId }: Props) {
  const { closeModal } = useModalContext();
  const methods = useForm<FV>({
    resolver: yupResolver(object().shape<SchemaShape<FV>>(proposalShape)),
    defaultValues: { title: `${type} charity application`, description: "" },
  });
  const { handleSubmit } = methods;

  function submit() {}

  return (
    <Dialog.Panel
      onSubmit={handleSubmit(submit)}
      as="form"
      className="p-6 fixed-center z-10 grid gap-4 text-gray-d2 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden"
    >
      <FormProvider {...methods}>
        <Field name="addr" label="Address" required />
        <Field name="share" label="Share (%)" required />
      </FormProvider>
      <button type="submit" className="btn btn-orange mt-6 text-sm">
        Add beneficiary
      </button>
    </Dialog.Panel>
  );
}

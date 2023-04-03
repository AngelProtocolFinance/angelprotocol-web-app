import { Dialog } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { lazy, number, object, string } from "yup";
import { SchemaShape } from "schemas/types";
import { Beneficiary } from "slices/launchpad/types";
import { useModalContext } from "contexts/ModalContext";
import { Field } from "components/form";
import { requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";

type Props = {
  share: number; //compute at modal opening
  added: string[]; //map at modal opening
  onAdd(beneficiary: Beneficiary): void;
};

type FV = Beneficiary;
export default function AddForm({ onAdd, share, added }: Props) {
  const { closeModal } = useModalContext();
  const methods = useForm<FV>({
    resolver: yupResolver(
      object().shape<SchemaShape<FV>>({
        addr: requiredWalletAddr(chainIds.polygon).notOneOf(
          added,
          "address already added"
        ),
        share: lazy((value) =>
          value === ""
            ? string().required("required")
            : number()
                .typeError("must be a number")
                .positive("must be more than 0")
                .max(100 - share, "total share must not exceed 100%")
        ),
      })
    ),
    defaultValues: {
      addr: "",
      share: "",
    },
  });
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
        <Field name="share" label="Share (%)" required />
      </FormProvider>
      <button type="submit" className="btn btn-orange mt-6 text-sm">
        Add beneficiary
      </button>
    </Dialog.Panel>
  );
}

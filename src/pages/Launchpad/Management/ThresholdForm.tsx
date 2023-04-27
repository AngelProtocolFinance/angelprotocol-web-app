import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { number, object } from "yup";
import { SchemaShape } from "schemas/types";
import { useModalContext } from "contexts/ModalContext";
import Modal from "components/Modal";
import { Field } from "components/form";

export type Props = {
  initial: number;
  added: string[];
  onChange(threshold: number): void;
};

type FV = { threshold: number };

export default function ThresholdForm({ onChange, added, initial }: Props) {
  const { closeModal } = useModalContext();
  const methods = useForm<FV>({
    defaultValues: { threshold: initial },
    resolver: yupResolver(
      object().shape<SchemaShape<FV>>({
        threshold: number()
          .typeError("required")
          .integer("no decimals")
          .min(1, "at least 1")
          //if no members set, default to 1
          .max(added.length || 1, "can't be more than number of members"),
      })
    ),
  });
  const { handleSubmit } = methods;

  const submit: SubmitHandler<FV> = ({ threshold }) => {
    onChange(+threshold);
    closeModal();
  };

  return (
    <Modal
      onSubmit={handleSubmit(submit)}
      as="form"
      className="p-6 fixed-center z-10 grid gap-4 text-gray-d2 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden"
    >
      <FormProvider {...methods}>
        <Field<FV, "number">
          type="number"
          step={1}
          name="threshold"
          label="Number of signatures to pass"
          classes={{ container: "mt-8 mb-4" }}
          required
        />
      </FormProvider>
      <button type="submit" className="btn btn-orange mt-6">
        Submit
      </button>
    </Modal>
  );
}

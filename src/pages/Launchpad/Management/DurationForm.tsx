import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object } from "yup";
import { SchemaShape } from "schemas/types";
import { useModalContext } from "contexts/ModalContext";
import Modal from "components/Modal";
import { Field } from "components/form";
import { requiredPositiveNumber } from "schemas/number";

export type Props = {
  initial: string;
  onChange(duration: string): void;
};

type FV = { duration: string };

export default function DurationForm({ onChange, initial }: Props) {
  const { closeModal } = useModalContext();
  const methods = useForm<FV>({
    defaultValues: { duration: initial },
    resolver: yupResolver(
      object().shape<SchemaShape<FV>>({
        duration: requiredPositiveNumber,
      })
    ),
  });
  const { handleSubmit } = methods;

  const submit: SubmitHandler<FV> = ({ duration }) => {
    onChange(duration);
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
          name="duration"
          label="Duration (hours)"
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

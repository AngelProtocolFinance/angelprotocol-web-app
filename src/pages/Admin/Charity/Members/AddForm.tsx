import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { object } from "yup";
import { useAuthenticatedUser } from "contexts/Auth";
import { useModalContext } from "contexts/ModalContext";
import Modal from "components/Modal";
import { Field } from "components/form";
import { requiredString } from "schemas/string";

export type Props = {
  added: string[];
};

export default function AddForm({ added }: Props) {
  const { email: userEmail } = useAuthenticatedUser();
  const { closeModal } = useModalContext();
  const methods = useForm({
    resolver: yupResolver(
      object({
        firstName: requiredString,
        lastName: requiredString,
        email: requiredString
          .email("invalid email")
          .notOneOf(added, "already a member"),
      })
    ),
  });

  type FV = typeof methods extends UseFormReturn<infer U> ? U : never;
  const { handleSubmit } = methods;

  const submit: SubmitHandler<FV> = async (data) => {};

  return (
    <Modal
      onSubmit={handleSubmit(submit)}
      as="form"
      className="p-6 fixed-center z-10 grid gap-4 text-gray-d2 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden"
    >
      <FormProvider {...methods}>
        <Field<FV> name="email" label="Email" required />
        <Field<FV> name="firstName" label="First name" required />
        <Field<FV> name="lastName" label="Last name" required />
      </FormProvider>
      <button type="submit" className="btn btn-orange mt-6">
        Add member
      </button>
    </Modal>
  );
}

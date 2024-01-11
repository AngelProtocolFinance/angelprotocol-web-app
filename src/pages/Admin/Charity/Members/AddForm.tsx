import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { object } from "yup";
import { useLazyProfileQuery } from "services/aws/aws";
import { useNewEndowAdminMutation } from "services/aws/users";
import { useModalContext } from "contexts/ModalContext";
import Modal from "components/Modal";
import Prompt from "components/Prompt";
import { Field } from "components/form";
import { requiredString } from "schemas/string";

export type Props = {
  endowID: number;
  added: string[];
};

export default function AddForm({ added, endowID }: Props) {
  const [addAdmin] = useNewEndowAdminMutation();
  const [profile] = useLazyProfileQuery();
  const { setModalOption, showModal } = useModalContext();
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
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const submit: SubmitHandler<FV> = async (fv) => {
    try {
      setModalOption("isDismissible", false);
      //get endowname
      const { data } = await profile({ id: endowID, fields: ["name"] });

      await addAdmin({
        firstName: fv.firstName,
        lastName: fv.lastName,
        email: fv.email,
        endowID,
        endowName: data?.name || `Endowment:${endowID}`,
      }).unwrap();

      showModal(Prompt, {
        headline: "Success!",
        children: (
          <p className="py-6">
            User succesfully added!{" "}
            <span className="font-semibold">{fv.email}</span> should signin to
            apply new credentials.
          </p>
        ),
      });
    } catch (err) {
      showModal(Prompt, {
        headline: "Error.",
        children: (
          <p className="py-6 text-red">Failed to add {fv.email} to members</p>
        ),
      });
    }
  };

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
      <button disabled={isSubmitting} type="submit" className="btn-orange mt-6">
        Add member
      </button>
    </Modal>
  );
}

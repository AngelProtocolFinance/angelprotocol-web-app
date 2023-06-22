import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues as FV, FormProps } from "./types";
import Modal from "components/Modal";
import { Field } from "components/form";
import { useAdminContext } from "../../../Context";
import { schema } from "./schema";
import useUpdateMembers from "./useUpdateMembers";

export default function AddForm({ address, action }: FormProps) {
  const { members } = useAdminContext();

  const methods = useForm<FV>({
    resolver: yupResolver(schema),
    context: { members, action },
    defaultValues: { address },
  });

  const { updateMembers, isSending } = useUpdateMembers(action);

  const { handleSubmit } = methods;

  return (
    <Modal
      onSubmit={handleSubmit(updateMembers)}
      as="form"
      className="p-6 fixed-center z-10 grid gap-4 text-gray-d2 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden"
    >
      <FormProvider {...methods}>
        <Field<FV>
          classes="field-admin"
          label="Proposal title"
          name="title"
          required
        />
        <Field<FV, "textarea">
          type="textarea"
          classes="field-admin"
          label="Proposal description"
          name="description"
          required
        />
        <Field<FV>
          name="address"
          label={`Address to ${action}`}
          classes="field-admin"
          disabled={action === "remove"}
          required
        />
      </FormProvider>
      <button
        type="submit"
        className="btn btn-orange mt-6 text-sm"
        disabled={isSending}
      >
        Submit
      </button>
    </Modal>
  );
}

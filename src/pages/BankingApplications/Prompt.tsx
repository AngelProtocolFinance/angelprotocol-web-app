import { yupResolver } from "@hookform/resolvers/yup";
import Icon from "components/Icon";
import Modal from "components/Modal";
import GenericPrompt from "components/Prompt";
import { Field } from "components/form";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import type { PropsWithChildren } from "react";
import {
  FormProvider,
  type SubmitHandler,
  type UseFormReturn,
  useForm,
} from "react-hook-form";
import { requiredString } from "schemas/string";
import { useUpdateBankingApplicationMutation } from "services/aws/banking-applications";
import { object, string } from "yup";

type Props = {
  uuid: string;
  verdict: "approve" | "reject";
};

export default function Prompt({ verdict, uuid }: Props) {
  const [review, { isLoading }] = useUpdateBankingApplicationMutation();
  const { handleError } = useErrorContext();
  const { isDismissible, setModalOption, closeModal, showModal } =
    useModalContext();
  const methods = useForm({
    resolver: yupResolver(
      object({
        reason: verdict === "approve" ? string().trim() : requiredString.trim(),
      })
    ),
    defaultValues: { reason: "" },
  });

  type FV = typeof methods extends UseFormReturn<infer U> ? U : never;

  const onSubmit: SubmitHandler<FV> = async ({ reason = "" }) => {
    setModalOption("isDismissible", false);
    const result = await review({
      uuid,
      ...(verdict === "approve"
        ? { type: "approved" }
        : { type: "rejected", reason }),
    });

    if ("error" in result) {
      return handleError(result.error, { context: "applying your review" });
    }

    showModal(GenericPrompt, {
      headline: "Success",
      children: (
        <p className="my-4 text-lg font-semibold">
          Your review has been submitted.
        </p>
      ),
    });
  };

  return (
    <Modal
      as="form"
      onSubmit={methods.handleSubmit(onSubmit)}
      className="fixed-center z-10 grid content-start justify-items-center text-navy-d4 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden"
    >
      <div className="relative w-full">
        <p className="sm:text-xl font-bold text-center border-b bg-blue-l5 dark:bg-blue-d7 border-gray-l4 p-5">
          Banking application
        </p>
        {isDismissible && (
          <button
            onClick={closeModal}
            disabled={isLoading}
            className="border border-gray-l4 p-2 rounded-md absolute top-1/2 right-4 transform -translate-y-1/2 disabled:text-navy-l5 dark:disabled:text-navy-d3 disabled:dark:border-navy-d3"
          >
            <Icon type="Close" className="text-lg sm:text-2xl" />
          </button>
        )}
      </div>
      <p className="px-6 pb-4 text-center text-navy-l1 dark:text-navy-l5 mt-4 font-semibold">
        You are about to {verdict} this banking application.
      </p>

      {verdict === "approve" ? (
        <div className="px-6 pb-4 text-center text-navy-l1 dark:text-navy-l5">
          This will immediately payout all pending funds to newly linked bank
          account and is irreversible.
        </div>
      ) : null}

      <div className="flex items-center gap-2 mb-6">
        <Status classes="bg-gray-d2">Under review</Status>
        <Icon type="ChevronRight" />
        {verdict === "approve" ? (
          <Status classes="bg-green">Approved</Status>
        ) : (
          <Status classes="bg-red">Rejected</Status>
        )}
      </div>

      {verdict === "reject" && (
        <FormProvider {...methods}>
          <div className="px-6 w-full pb-6">
            <Field<FV, "textarea">
              required
              name="reason"
              type="textarea"
              label="Reason for rejection:"
            />
          </div>
        </FormProvider>
      )}

      <div className="p-3 sm:px-8 sm:py-4 flex items-center justify-end gap-4 w-full text-center sm:text-right bg-blue-l5 dark:bg-blue-d7 border-t border-gray-l4">
        <button
          disabled={isLoading}
          type="button"
          className="btn-outline-filled text-sm px-8 py-2"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          disabled={isLoading}
          type="submit"
          className="btn-blue px-8 py-2 text-sm"
        >
          Submit
        </button>
      </div>
    </Modal>
  );
}

function Status(props: PropsWithChildren<{ classes?: string }>) {
  return (
    <div
      className={`${
        props.classes ?? ""
      } text-white px-2 py-1 text-xs uppercase rounded`}
    >
      {props.children}
    </div>
  );
}

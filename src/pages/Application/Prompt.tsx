import { yupResolver } from "@hookform/resolvers/yup";
import Icon from "components/Icon";
import Modal from "components/Modal";
import GenericPrompt from "components/Prompt";
import { Field } from "components/form";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { PropsWithChildren } from "react";
import {
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { requiredString } from "schemas/string";
import { useReviewApplicationMutation } from "services/aws/aws";
import { object, string } from "yup";

type Props = {
  uuid: string;
  orgName: string;
  verdict: "approve" | "reject";
};

export default function Prompt({ verdict, orgName, uuid }: Props) {
  const [review, { isLoading }] = useReviewApplicationMutation();
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

  const onSubmit: SubmitHandler<FV> = async (fv) => {
    setModalOption("isDismissible", false);
    const result = await review({
      PK: uuid,
      ...(verdict === "approve"
        ? { verdict: "approved" }
        : { verdict: "rejected", rejectionReason: fv.reason ?? "" }),
    });

    if ("error" in result) return handleError(result.error);

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
          Changing Application Status
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
      <Icon type="ExclamationCircleFill" size={80} className="my-6 text-red" />

      <h3 className="text-center text-2xl mb-2 leading-tight px-3 sm:px-8">
        <div className="uppercase">{verdict}</div>
        <div>Nonprofit</div>
      </h3>

      <p className="px-6 pb-4 text-center text-navy-l1 dark:text-navy-l5 mt-4">
        <span className="block">
          You are about to {verdict} the Application for
        </span>
        <span className="font-semibold block">{orgName}</span>
      </p>

      {verdict === "approve" ? (
        <div className="px-6 pb-4 text-center text-navy-l1 dark:text-navy-l5">
          This will immediately payout all pending funds to newly linked bank
          account and is irreversible.
        </div>
      ) : null}

      <div className="px-6 pb-4 text-center text-navy-l1 dark:text-navy-l5 font-bold">
        Please ensure you have confirmed all submitted details and supporting
        documentation before proceeding!
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Status classes="bg-gray-d2">Pending</Status>
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

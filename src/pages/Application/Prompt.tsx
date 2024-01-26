import { yupResolver } from "@hookform/resolvers/yup";
import { PropsWithChildren } from "react";
import {
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { object, string } from "yup";
import { useReviewApplicationMutation } from "services/aws/aws";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import Modal from "components/Modal";
import GenericPrompt from "components/Prompt";
import { Field } from "components/form";

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
        reason:
          verdict === "approve" ? string() : string().required("required"),
      }),
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

    if ("error" in result) {
      handleError(result.error);
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
      className="fixed-center z-10 grid content-start justify-items-center text-gray-d2 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden"
    >
      <div className="relative w-full">
        <p className="sm:text-xl font-bold text-center border-b bg-orange-l6 dark:bg-blue-d7 border-prim p-5 font-work">
          Changing Application Status
        </p>
        {isDismissible && (
          <button
            onClick={closeModal}
            disabled={isLoading}
            className="border border-prim p-2 rounded-md absolute top-1/2 right-4 transform -translate-y-1/2 disabled:text-gray-l3 dark:disabled:text-bluegray-d1 disabled:dark:border-bluegray-d1"
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

      <p className="px-6 pb-4 text-center text-gray-d1 dark:text-gray-l3 mt-4">
        <span className="block">
          You are about to {verdict} the Application for
        </span>
        <span className="font-semibold block">{orgName}</span>
      </p>

      {verdict === "approve" ? (
        <div className="px-6 pb-4 text-center text-gray-d1 dark:text-gray-l3">
          This will immediately payout all pending funds to newly linked bank
          account and is irreversible.
        </div>
      ) : null}

      <div className="px-6 pb-4 text-center text-gray-d1 dark:text-gray-l3 font-bold">
        Please ensure you have confirmed all submitted details and supporting
        documentation before proceeding!
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Status classes="bg-gray-d2">Pending</Status>
        <Icon type="ArrowRight" />
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

      <div className="p-3 sm:px-8 sm:py-4 flex items-center justify-end gap-4 w-full text-center sm:text-right bg-orange-l6 dark:bg-blue-d7 border-t border-prim">
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
          className="btn-orange px-8 py-2 text-sm"
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
      } text-white px-2 py-1 text-xs font-work uppercase rounded`}
    >
      {props.children}
    </div>
  );
}

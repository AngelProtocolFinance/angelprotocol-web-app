import { yupResolver } from "@hookform/resolvers/yup";
import { PropsWithChildren } from "react";
import { FormProvider, UseFormReturn, useForm } from "react-hook-form";
import { object, string } from "yup";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import Modal from "components/Modal";
import { Field } from "components/form";

type Props = {
  orgName: string;
  verdict: "approve" | "reject";
};

export default function Prompt({ verdict, orgName }: Props) {
  const { isDismissible, setModalOption, closeModal } = useModalContext();
  const methods = useForm({
    resolver: yupResolver(object({ reason: string().optional() })),
    defaultValues: { reason: "" },
  });

  type FV = typeof methods extends UseFormReturn<infer U> ? U : never;

  return (
    <Modal
      as="form"
      className="fixed-center z-10 grid text-gray-d2 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden"
    >
      <div className="relative">
        <p className="empty:h-16 text-xl font-bold text-center border-b bg-orange-l6 dark:bg-blue-d7 border-prim p-5 font-work">
          Changing Application Status
        </p>
        {isDismissible && (
          <button
            onClick={closeModal}
            className="border border-prim p-2 rounded-md absolute top-1/2 right-4 transform -translate-y-1/2 disabled:text-gray-l3 dark:disabled:text-bluegray-d1 disabled:dark:border-bluegray-d1"
          >
            <Icon type="Close" size={24} />
          </button>
        )}
      </div>
      <Icon
        type="ExclamationCircleFill"
        size={80}
        className="mb-6 sm:mb-8 mt-4 sm:mt-12 text-red"
      />

      <h3 className="uppercase text-center text-3xl mb-2 leading-normal px-3 sm:px-8">
        {verdict} Endowment
      </h3>

      <div className="px-6 pb-4 text-center text-gray-d1 dark:text-gray">
        You are about to {verdict} the application for{" "}
        <span className="font-semibold">{orgName}</span>
      </div>

      {verdict === "approve" ? (
        <div className="px-6 pb-4 text-center text-gray-d1 dark:text-gray">
          This will immediately payout all pending funds to newly linked bank
          account and is irreversible.
        </div>
      ) : null}

      <div className="px-6 pb-4 text-center text-gray-d1 dark:text-gray font-bold">
        Please ensure you have confirmed all submitted details and supporting
        documentation before proceeding!
      </div>

      <div className="flex items-center gap-2">
        <Pill classes="bg-gray-d2">Pending</Pill>
        <Icon type="ArrowRight" />
        {verdict === "approve" ? (
          <Pill classes="bg-green">Approved</Pill>
        ) : (
          <Pill classes="bg-red">Rejected</Pill>
        )}
      </div>

      {verdict === "reject" && (
        <FormProvider {...methods}>
          <Field<FV, "textarea">
            name="reason"
            type="textarea"
            label="Reason for rejection"
          />
        </FormProvider>
      )}

      <div className="p-3 sm:px-8 sm:py-4 w-full text-center sm:text-right bg-orange-l6 dark:bg-blue-d7 border-t border-prim">
        <button
          type="button"
          className="inline-block btn-orange px-8 py-2 max-sm:w-full"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          type="button"
          className="inline-block btn-orange px-8 py-2 max-sm:w-full"
          onClick={closeModal}
        >
          Submit
        </button>
      </div>
    </Modal>
  );
}

function Pill(props: PropsWithChildren<{ classes?: string }>) {
  return (
    <div className={`${props.classes ?? ""} text-white px-2 py-1`}>
      {props.children}
    </div>
  );
}

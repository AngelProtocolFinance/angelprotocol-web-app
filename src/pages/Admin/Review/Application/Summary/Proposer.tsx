import type { BigNumber } from "@ethersproject/bignumber";
import { Dialog } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { object } from "yup";
import { ProposalBase } from "../../../types";
import { TxType } from "../types";
import { SchemaShape } from "schemas/types";
import { TxOnSuccess } from "types/tx";
import { useUpdateRegMutation } from "services/aws/registration";
import { useModalContext } from "contexts/ModalContext";
import { TxPrompt } from "components/Prompt";
import { Field } from "components/form";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import { multisig as Multisig, SubmissionEvent } from "contracts/evm/multisig";
import useTxSender from "hooks/useTxSender";
import { useAdminContext } from "../../../Context";
import { proposalShape } from "../../../constants";

type Props = {
  type: TxType;
  appId: number;
  reference: string;
};

type FV = ProposalBase & /** meta */ Props;
export default function Proposer({ type, appId, reference }: Props) {
  const methods = useForm<FV>({
    resolver: yupResolver(object().shape<SchemaShape<FV>>(proposalShape)),
    defaultValues: {
      title: `${type} charity application`,
      description: "",
      appId,
      type,
    },
  });

  const { multisig, wallet, _tx } = useAdminContext();
  const { showModal } = useModalContext();
  const { sendTx, isSending } = useTxSender(true);
  const [updateReg] = useUpdateRegMutation();

  const { handleSubmit } = methods;

  async function submit({ type, ...fv }: FV) {
    const [data, dest] = encodeTx(
      type === "approve"
        ? "charity-application.approve"
        : "charity-application.reject",
      {
        id: fv.appId,
      }
    );

    const onSuccess: TxOnSuccess = async (result) => {
      const { data, ...okTx } = result;
      const txId = data as string | null;

      if (!txId) {
        return showModal(TxPrompt, {
          error: "Failed to retrieve transaction id",
          tx: okTx,
        });
      }

      showModal(
        TxPrompt,
        { loading: "Saving application id..." },
        { isDismissible: false }
      );

      const res = await updateReg({
        type: "application",
        reference,
        approve_tx_id: +txId,
      });

      if ("error" in res) {
        return showModal(TxPrompt, {
          error:
            "Failed to save application id. Please try to resubmit proposal",
        });
      }

      showModal(TxPrompt, {
        success: {
          message: `Proposal has been created${
            _tx.willExecute ? " and auto-executed" : "."
          }`,
        },
        tx: okTx,
      });
    };

    await sendTx({
      content: {
        type: "evm",
        val: createTx(wallet.address, "multisig.submit-transaction", {
          multisig,
          title: fv.title,
          description: fv.description,
          destination: dest,
          value: "0",
          data,
          meta: "",
        }),
        log: (logs) => {
          const topic = Multisig.getEventTopic(SubmissionEvent);
          const log = logs.find((log) => log.topics.includes(topic));
          if (!log) return null;
          const [id] = Multisig.decodeEventLog(
            SubmissionEvent,
            log.data,
            log.topics
          );
          return (id as BigNumber).toString();
        },
      },
      ..._tx,
      onSuccess,
    });
  }

  return (
    <Dialog.Panel
      onSubmit={handleSubmit(submit)}
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
      </FormProvider>
      <button
        disabled={isSending}
        type="submit"
        className="btn-orange mt-6 text-sm"
      >
        {isSending ? "Sending transaction..." : `Submit ${type} proposal`}
      </button>
    </Dialog.Panel>
  );
}

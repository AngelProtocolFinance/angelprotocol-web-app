import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ObjectSchema, mixed, object, string, date as yupDate } from "yup";
import { FV } from "./types";
import { SchemaShape } from "schemas/types";
import { EndowmentSettingsUpdate } from "types/contracts";
import { SimulContractTx } from "types/evm";
import { useModalContext } from "contexts/ModalContext";
import { TxPrompt } from "components/Prompt";
import { dateToFormFormat } from "components/form";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { isEmpty } from "helpers";
import {
  blockTime,
  fromBlockTime,
  getPayloadDiff,
  getTagPayloads,
} from "helpers/admin";
import { isTooltip, useAdminContext } from "../../Context";
import Form from "./Form";

const schema = object<any, SchemaShape<FV>>({
  date: mixed().when("willMature", {
    is: true,
    then: () =>
      yupDate()
        .typeError("invalid date")
        .min(new Date(), "must be in the future"),
    otherwise: () => string(),
  }),
}) as ObjectSchema<FV>;

export default function Maturity() {
  const {
    id,
    donationMatchActive,
    splitToLiquid,
    ignoreUserSplits,
    maturityTime,
    txResource,
    multisig,
  } = useAdminContext<"charity">(["maturityAllowlist", "maturityTime"]);
  const { showModal } = useModalContext();
  const sendTx = useTxSender();

  const initial: EndowmentSettingsUpdate = {
    id,
    donationMatchActive,
    maturityTime,
    splitToLiquid,
    ignoreUserSplits,
  };

  const willMature = maturityTime !== 0;
  const defaults: FV = {
    willMature,
    //date is valid date-string, when data.willMature is true
    date: willMature ? dateToFormFormat(fromBlockTime(maturityTime)) : "",
    initial,
  };

  const methods = useForm<FV>({
    resolver: yupResolver(schema),
    defaultValues: defaults,
  });

  const onSubmit: SubmitHandler<FV> = async ({ initial, willMature, date }) => {
    try {
      if (isTooltip(txResource)) throw new Error(txResource);

      const update: EndowmentSettingsUpdate = {
        ...initial,
        maturityTime: willMature ? blockTime(date) : 0,
        //if maturity is disabled, remove all beneficiaries
      };

      const diff = getPayloadDiff(initial, update);
      if (isEmpty(diff)) {
        return showModal(TxPrompt, { error: "No changes detected" });
      }
      const { wallet, txMeta, isDelegated } = txResource;

      const [data, dest, meta] = encodeTx("accounts.update-settings", update, {
        title: `Update maturity`,
        description: `Update maturity for endowment id:${id} by member:${wallet?.address}`,
        content: diff,
      });

      const tx: SimulContractTx = isDelegated
        ? { from: wallet.address, to: dest, data }
        : createTx(wallet.address, "multisig.submit-transaction", {
            multisig,

            destination: dest,
            value: "0",
            data,
            meta: meta.encoded,
          });

      await sendTx({
        content: { type: "evm", val: tx },
        ...txMeta,
        tagPayloads: getTagPayloads(txMeta.willExecute && meta.id),
      });
    } catch (err) {
      showModal(TxPrompt, {
        error: err instanceof Error ? err.message : "Unknown error occured",
      });
    }
  };

  const { handleSubmit, reset } = methods;
  const tooltip = isTooltip(txResource) ? txResource : undefined;

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        onReset={(e) => {
          e.preventDefault();
          reset();
        }}
        tooltip={tooltip}
      />
    </FormProvider>
  );
}

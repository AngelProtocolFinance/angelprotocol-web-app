import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FV } from "./types";
import { EndowmentSettingsUpdate } from "types/contracts";
import { SimulContractTx } from "types/evm";
import { useModalContext } from "contexts/ModalContext";
import { TxPrompt } from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { isEmpty } from "helpers";
import { getPayloadDiff, getTagPayloads } from "helpers/admin";
import { toContractSplit, toFormSplit } from "helpers/ast";
import { isTooltip, useAdminContext } from "../../../Context";
import Form from "./Form";

export default function Splits() {
  const {
    multisig,
    txResource,
    splitToLiquid,
    ignoreUserSplits,
    allowlistedBeneficiaries,
    allowlistedContributors,
    id,
    donationMatchActive,
    maturityTime,
  } = useAdminContext<"charity">(["ignoreUserSplits", "splitToLiquid"]);

  const sendTx = useTxSender();
  const { showModal } = useModalContext();

  const initial: EndowmentSettingsUpdate = {
    id,
    donationMatchActive,
    maturityTime,
    allowlistedBeneficiaries,
    allowlistedContributors,
    maturity_allowlist_add: [], //not included in form
    maturity_allowlist_remove: [], //not included in form
    splitToLiquid,
    ignoreUserSplits,
  };

  const defaultValues: FV = {
    ...toFormSplit(splitToLiquid, !ignoreUserSplits),
    //meta
    defaultMin: "0",
    initial,
  };

  const methods = useForm<FV>({ defaultValues });

  const update: SubmitHandler<FV> = async (splits) => {
    try {
      if (isTooltip(txResource)) throw new Error(txResource);

      const update: EndowmentSettingsUpdate = {
        ...initial,
        splitToLiquid: toContractSplit(splits),
        ignoreUserSplits: !splits.isCustom,
      };

      const diff = getPayloadDiff(initial, update);

      if (isEmpty(diff)) {
        return showModal(TxPrompt, { error: "No changes detected" });
      }

      const [data, dest, meta] = encodeTx(
        "accounts.update-settings",
        update,
        diff
      );

      const { wallet, txMeta, isDelegated } = txResource;
      const tx: SimulContractTx = isDelegated
        ? { from: wallet.address, to: dest, data }
        : createTx(wallet.address, "multisig.submit-transaction", {
            multisig,
            title: `Update splits`,
            description: `Update splits for endowment id:${id} by member:${wallet?.address}`,
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

  const tooltip = isTooltip(txResource) ? txResource : undefined;
  const { handleSubmit, reset } = methods;

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={handleSubmit((data) => update(data))}
        onReset={(e) => {
          e.preventDefault();
          reset(defaultValues);
        }}
        aria-disabled={!!tooltip}
        tooltip={tooltip}
      />
    </FormProvider>
  );
}

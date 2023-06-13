import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FV } from "./types";
import { EndowmentSettingsUpdate } from "types/contracts";
import { SimulContractTx } from "types/evm";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { TxPrompt } from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { isEmpty } from "helpers";
import { getPayloadDiff, getTagPayloads } from "helpers/admin";
import Form from "./Form";

export default function Splits() {
  const {
    multisig,
    getWallet,
    splitToLiquid,
    ignoreUserSplits,
    allowlistedBeneficiaries,
    allowlistedContributors,
    id,
    donationMatchActive,
    maturityTime,
  } = useAdminResources<"charity">();

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

  const methods = useForm<FV>({
    defaultValues: {
      isCustom: !ignoreUserSplits,
      //set max diff so user see how UI is used
      min: splitToLiquid.min.toString(),
      max: splitToLiquid.max.toString(),

      default: splitToLiquid.defaultSplit.toString(),

      //meta
      defaultMin: "0",
      initial,
    },
  });

  const { handleSubmit } = methods;

  const update: SubmitHandler<FV> = async (splits) => {
    try {
      const wallet = getWallet(["ignoreUserSplits", "splitToLiquid"]);
      if (typeof wallet === "function") return wallet();

      const update: EndowmentSettingsUpdate = {
        ...initial,
        splitToLiquid: {
          min: 100 - +splits.max,
          max: 100 - +splits.min,
          defaultSplit: +splits.default,
        },
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
      const tx: SimulContractTx = wallet.isDelegated
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
        ...wallet.meta,
        tagPayloads: getTagPayloads(wallet.meta.willExecute && meta.id),
      });
    } catch (err) {
      showModal(TxPrompt, {
        error: err instanceof Error ? err.message : "Unknown error occured",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit((data) => update(data))} />
    </FormProvider>
  );
}

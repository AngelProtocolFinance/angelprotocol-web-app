import { SubmitHandler, useFormContext } from "react-hook-form";
import { FormValues } from "./types";
import { EndowmentSettingsUpdate } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import { TxPrompt } from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { isEVM } from "helpers";
import { getPayloadDiff, getTagPayloads } from "helpers/admin";

// import optimizeImage from "./optimizeImage";

export default function useEditWhitelists() {
  const { id, propMeta, multisig } = useAdminResources<"charity">();
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FormValues>();

  const { showModal } = useModalContext();
  const { wallet } = useGetWallet();
  const sendTx = useTxSender();

  const editWhitelists: SubmitHandler<FormValues> = async ({
    initial,
    contributors,
    beneficiaries,
  }) => {
    try {
      /** special case for edit profile: since upload happens prior
       * to tx submission. Other users of useTxSender
       */
      if (!wallet) {
        return showModal(TxPrompt, {
          error: "You need to connect your wallet to make this transaction.",
        });
      }

      if (!isEVM(wallet.providerId)) {
        return showModal(TxPrompt, {
          error: "Please connect an EVM compatible wallet",
        });
      }

      if (!propMeta.isAuthorized) {
        return showModal(TxPrompt, {
          error: "You are not authorized to make this transaction.",
        });
      }

      const changes = {
        contributors,
        beneficiaries,
      };

      const diff = getPayloadDiff(initial, changes);

      if (Object.entries(diff).length <= 0) {
        return showModal(TxPrompt, { error: "No changes detected" });
      }

      /** already clean - no need to futher clean "": to unset values { field: val }, field must have a value 
     like ""; unlike contracts where if fields is not present, val is set to null.
    */
      const updates: EndowmentSettingsUpdate = {
        id,
        donationMatchActive: false,
        whitelistedContributors: diff.contributors || [],
        whitelistedBeneficiaries: diff.beneficiaries || [],
        maturity_whitelist_add: [],
        maturity_whitelist_remove: [],
        splitToLiquid: {
          min: 0,
          max: 100,
          defaultSplit: 50,
        },
        ignoreUserSplits: false,
      };
      // tried this too
      // let tx = createTx(wallet.address, "accounts.update-settings", updates);

      // tried this too
      const [data, dest] = encodeTx("accounts.update-settings", updates);
      let tx = createTx(wallet.address, "multisig.submit-transaction", {
        multisig,
        title: `Update whitelists settings`,
        description: `Update whitelists settings for endowment id:${id} by member:${wallet?.address}`,
        destination: dest,
        value: "0",
        data,
      });
      await sendTx({
        content: { type: "evm", val: tx },
        ...propMeta,
        isAuthorized: true,
        tagPayloads: getTagPayloads(propMeta.willExecute && "endow_controller"),
      });
    } catch (err) {
      showModal(TxPrompt, {
        error: err instanceof Error ? err.message : "Unknown error occured",
      });
    }
  };

  return {
    reset,
    editWhitelists: handleSubmit(editWhitelists),
    isSubmitting,
  };
}

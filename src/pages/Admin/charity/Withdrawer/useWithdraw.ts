import { Coin } from "@cosmjs/proto-signing";
import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import { WithdrawLiqMeta } from "pages/Admin/types";
import { CW20 } from "types/server/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { logWithdrawProposal } from "pages/Admin/charity/Withdrawer/logWithdrawProposal";
import { invalidateJunoTags } from "services/juno";
import { adminTags, junoTags } from "services/juno/tags";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useGetter, useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import Account from "contracts/Account";
import CW3 from "contracts/CW3";
import { scaleToStr } from "helpers";
import { ap_wallets } from "constants/ap_wallets";
import { chainIds } from "constants/chainIds";

export default function useWithdraw() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const {
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<WithdrawValues>();

  const { cw3, endowmentId } = useAdminResources();
  const { wallet } = useGetWallet();
  const { proposalLink } = useAdminResources();
  const dispatch = useSetter();

  function withdraw(data: WithdrawValues) {
    //filter + map
    const [cw20s, natives] = data.amounts.reduce(
      (result, amount) => {
        if (amount.type === "cw20") {
          result[0].push({
            address: amount.tokenId,
            amount: scaleToStr(amount.value),
          });
        } else {
          result[1].push({
            denom: amount.tokenId,
            amount: scaleToStr(amount.value),
          });
        }
        return result;
      },
      [[], []] as [CW20[], Coin[]]
    );

    const isJuno = data.network === chainIds.juno;
    const account = new Account(wallet);
    const msg = account.createEmbeddedWithdrawLiqMsg({
      id: endowmentId,
      beneficiary:
        //if not juno, send to ap wallet (juno)
        isJuno ? data.beneficiary : ap_wallets.juno,
      assets: {
        cw20: cw20s,
        native: natives,
      },
    });

    const meta: WithdrawLiqMeta = {
      type: "acc_withdraw_liq",
      data: {
        beneficiary: data.beneficiary,
      },
    };

    const cw3contract = new CW3(wallet, cw3);
    //proposal meta for preview
    const proposal = cw3contract.createProposalMsg(
      "withdraw proposal",
      `withdraw from endowment: ${endowmentId}`,
      [msg],
      JSON.stringify(meta)
    );

    dispatch(
      sendCosmosTx({
        wallet,
        msgs: [proposal],
        tagPayloads: [
          invalidateJunoTags([
            //no need to invalidate balance, since this is just proposal
            { type: junoTags.admin, id: adminTags.proposals },
          ]),
        ],
        successLink: proposalLink,
        successMessage: "Withdraw proposal successfully created!",
        setLogProcessor: isJuno
          ? undefined //no need to POST to AWS if destination is juno
          : (rawLog /**TODO: pass whole response */) =>
              //will run if sendCosmos is success
              logWithdrawProposal({
                rawLog,
                endowment_multisig: cw3,
                proposal_chain_id: chainIds.juno,
                target_chain: data.network,
                target_wallet: data.beneficiary,
              }),
      })
    );
  }

  return {
    withdraw: handleSubmit(withdraw),
    isSubmitDisabled:
      !isValid ||
      !isDirty ||
      form_loading ||
      form_error !== null ||
      isSubmitting,
    isFormLoading: form_loading,
  };
}

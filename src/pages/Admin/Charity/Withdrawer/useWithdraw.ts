import { Coin } from "@cosmjs/proto-signing";
import Decimal from "decimal.js";
import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import { WithdrawLiqMeta } from "pages/Admin/types";
import { CW20 } from "types/server/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { invalidateJunoTags } from "services/juno";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useGetter, useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import Account from "contracts/Account";
import CW3 from "contracts/CW3";
import { ap_wallets } from "constants/ap_wallets";
import { chainIds } from "constants/chainIds";

export default function useWithdraw() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const {
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<WithdrawValues>();

  const { cw3, endowment } = useAdminResources();
  const { wallet } = useGetWallet();
  const { proposalLink } = useAdminResources();
  const dispatch = useSetter();

  function withdraw(data: WithdrawValues) {
    //TODO: handle ETH/BNB,

    //filter + map
    const [cw20s, natives] = data.amounts.reduce(
      (result, amount) => {
        if (amount.type === "cw20") {
          result[0].push({
            address: amount.tokenId,
            amount: new Decimal(amount.value).mul(1e6).divToInt(1).toString(),
          });
        } else {
          result[1].push({
            denom: amount.tokenId,
            amount: new Decimal(amount.value).mul(1e6).divToInt(1).toString(),
          });
        }
        return result;
      },
      [[], []] as [CW20[], Coin[]]
    );

    const account = new Account(wallet, endowment);
    const msg = account.createEmbeddedWithdrawLiqMsg({
      beneficiary:
        //if not juno, send to apes wallet (juno)
        data.network !== chainIds.juno ? ap_wallets.juno : data.beneficiary,
      assets: {
        cw20: cw20s,
        native: natives,
      },
    });

    const meta: WithdrawLiqMeta = {
      type: "acc_withdraw_liq",
      data: {
        target_wallet: data.beneficiary,
        target_chain: data.network,
        proposal_chain_id: chainIds.juno,
      },
    };

    const cw3contract = new CW3(wallet, cw3);
    //proposal meta for preview
    const proposal = cw3contract.createProposalMsg(
      "withdraw proposal",
      `withdraw from endowment: ${endowment}`,
      [msg],
      JSON.stringify(meta)
    );

    dispatch(
      sendCosmosTx({
        wallet,
        msgs: [proposal],
        tagPayloads: [
          invalidateJunoTags([
            /**TODO: invalidate balance query */
          ]),
        ],
        successLink: proposalLink,
        successMessage: "Withdraw proposal successfully created!",
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

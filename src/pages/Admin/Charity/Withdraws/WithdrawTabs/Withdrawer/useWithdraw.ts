import { Coin } from "@cosmjs/proto-signing";
import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import { WithdrawLiqMeta } from "pages/Admin/types";
import { CW20 } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { invalidateJunoTags } from "services/juno";
import { adminTags, junoTags } from "services/juno/tags";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import Account from "contracts/Account";
import CW3 from "contracts/CW3";
import { scaleToStr } from "helpers";
import { ap_wallets } from "constants/ap_wallets";
import { chainIds } from "constants/chainIds";
import { logWithdrawProposal } from "./logWithdrawProposal";

export default function useWithdraw() {
  const {
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<WithdrawValues>();

  const { cw3, endowmentId, proposalLink } = useAdminResources();
  const { wallet } = useGetWallet();
  const dispatch = useSetter();

  function withdraw(data: WithdrawValues) {
    //filter + map
    const [cw20s, natives] = data.amounts.reduce(
      (result, amount) => {
        if (amount.type === "cw20") {
          if (amount.value /** empty "" */) {
            result[0].push({
              address: amount.tokenId,
              amount: scaleToStr(amount.value),
            });
          }
        } else {
          if (amount.value) {
            result[1].push({
              denom: amount.tokenId,
              amount: scaleToStr(amount.value),
            });
          }
        }
        return result;
      },
      [[], []] as [CW20[], Coin[]]
    );

    const isJuno = data.network === chainIds.juno;
    const account = new Account(wallet);
    const msg = account.createEmbeddedWithdrawMsg({
      id: endowmentId,
      beneficiary:
        //if not juno, send to ap wallet (juno)
        isJuno ? data.beneficiary : ap_wallets.juno,
      acct_type: data.type,
      assets: [
        ...cw20s.map((c) => ({
          amount: c.amount,
          info: { cw20: c.address },
        })),
        ...natives.map((c) => ({
          amount: c.amount,
          info: { native: c.denom },
        })),
      ],
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
        //Juno withdrawal
        successLink: proposalLink,
        successMessage: "Withdraw proposal successfully created!",

        onSuccess: isJuno
          ? undefined //no need to POST to AWS if destination is juno
          : (response) =>
              logWithdrawProposal({
                res: response,
                proposalLink,
                wallet: wallet!, //wallet is defined at this point

                endowment_multisig: cw3,
                proposal_chain_id: chainIds.juno,
                target_chain: data.network,
                target_wallet: data.beneficiary,
                type: data.type,
              }),
      })
    );
  }

  return {
    withdraw: handleSubmit(withdraw),
    isSubmitDisabled: !isValid || !isDirty || isSubmitting,
  };
}

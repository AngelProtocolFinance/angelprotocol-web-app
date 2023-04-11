import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import { WithdrawMeta } from "pages/Admin/types";
import { useAdminResources } from "pages/Admin/Guard";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Account from "contracts/Account";
import CW3Endowment from "contracts/CW3/CW3Endowment";
import useTxSender from "hooks/useTxSender";
import { scaleToStr } from "helpers";
import { ap_wallets } from "constants/ap_wallets";
import { chainIds } from "constants/chainIds";
import useLogWithdrawProposal from "./useLogWithdrawProposal";

/**
 * WITHRAWS FOR POLYGON
 *
 * --- NORMAL ENDOWMENTS ---
 * LIQUID
 * if sender is in beneficity whitelist, can send `accounts.withdraw` directly
 * if sender is not in whitelist, but in multisig, should send `accounts.withdraw` via endow-multisig
 *
 * LOCKED
 * if sender is in maturity whitelist, can send `accounts.withdraw` directly
 * if sender is not in whitelist, but in multisig, should send `accounts.withdraw` via endow-multisig
 *
 * --- CHARITY ---
 * LIQUID
 * `accounts.withdraw` via endow-multisig
 *
 * LOCKED
 * `locked-withdraw.propose` via endow-multisig
 *
 */

export default function useWithdraw() {
  const { handleSubmit, getValues } = useFormContext<WithdrawValues>();

  const { multisig, id, propMeta } = useAdminResources<"charity">();

  const { wallet } = useGetWallet();

  const sendTx = useTxSender();
  const logProposal = useLogWithdrawProposal(propMeta.successMeta);
  const type = getValues("type");

  async function withdraw(data: WithdrawValues) {
    //transform amounts
    const addresses: string[] = [];
    const amounts: string[] = [];

    for (const amount of data.amounts) {
      addresses.push(amount.tokenId);
      amounts.push(scaleToStr(amount.value));
    }

    const isJuno = data.network === chainIds.juno;
    //if not juno, send to ap wallet (juno)
    const beneficiary = isJuno ? data.beneficiary : ap_wallets.juno_withdraw;

    const meta: WithdrawMeta = {
      type: "acc_withdraw",
      data: {
        beneficiary: data.beneficiary,
        assets: [],
      },
    };

    const account = new Account(wallet);
    const endowCW3 = new CW3Endowment(wallet, multisig);

    const proposal =
      // AST's won't even have the opportunity to submit a "withdraw from 'locked' funds" form
      type === "locked"
        ? endowCW3.createWithdrawProposalMsg({
            endowment_id: id,
            assets: [],
            beneficiary,
            description: data.reason,
          })
        : //normal proposal when withdraw doesn't need to go thru AP
          endowCW3.createProposalMsg(
            "withdraw proposal",
            `withdraw ${type} assets from endowment id: ${id}`,
            [
              account.createEmbeddedWithdrawMsg({
                id,
                beneficiary,
                acct_type: data.type,
                assets: [],
              }),
            ],
            JSON.stringify(meta)
          );

    await sendTx({
      content: { type: "cosmos", val: [proposal], attribute: "proposal_id" },
      //Juno withdrawal
      ...propMeta,
      onSuccess: isJuno
        ? undefined //no need to POST to AWS if destination is juno
        : async (response, chain) =>
            await logProposal(
              {
                endowment_multisig: multisig,
                proposal_chain_id: chainIds.juno,
                target_chain: data.network,
                target_wallet: data.beneficiary,
                type: data.type,
              },
              response,
              chain
            ),
    });
  }

  return handleSubmit(withdraw);
}

import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import { WithdrawMeta } from "pages/Admin/types";
import { Asset } from "types/contracts";
import { accountTypeDisplayValue } from "pages/Admin/Charity/constants";
import { useAdminResources } from "pages/Admin/Guard";
import { useGetWallet } from "contexts/WalletContext";
import Account from "contracts/Account";
import CW3Endowment from "contracts/CW3/CW3Endowment";
import useCosmosTxSender from "hooks/useCosmosTxSender";
import { scaleToStr } from "helpers";
import { ap_wallets } from "constants/ap_wallets";
import { chainIds } from "constants/chainIds";
import useLogWithdrawProposal from "./useLogWithdrawProposal";

export default function useWithdraw() {
  const {
    handleSubmit,
    getValues,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<WithdrawValues>();

  const { cw3, endowmentId, endowment, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();

  const sendTx = useCosmosTxSender();
  const logProposal = useLogWithdrawProposal(propMeta.successMeta);
  const type = getValues("type");

  //NOTE: submit is disabled on Normal endowments with unmatured accounts
  async function withdraw(data: WithdrawValues) {
    const assets: Asset[] = data.amounts.map(
      ({ value, tokenId, type: tokenType }) => ({
        info: tokenType === "cw20" ? { cw20: tokenId } : { native: tokenId },
        amount: scaleToStr(value /** empty "" */ || "0"),
      })
    );

    const isJuno = data.network === chainIds.juno;
    //if not juno, send to ap wallet (juno)
    const beneficiary = isJuno ? data.beneficiary : ap_wallets.juno_withdraw;
    const isSendToApCW3 =
      endowment.endow_type === "Charity" && type === "locked";

    const meta: WithdrawMeta = {
      type: "acc_withdraw",
      data: {
        beneficiary: data.beneficiary,
        assets,
      },
    };

    const account = new Account(wallet);
    const endowCW3 = new CW3Endowment(wallet, cw3);

    const proposal = isSendToApCW3
      ? endowCW3.createWithdrawProposalMsg({
          endowment_id: endowmentId,
          assets,
          beneficiary,
          description: data.reason,
        })
      : //normal proposal when withdraw doesn't need to go thru AP
        endowCW3.createProposalMsg(
          "withdraw proposal",
          `withdraw ${accountTypeDisplayValue[type]} assets from endowment id: ${endowmentId}`,
          [
            account.createEmbeddedWithdrawMsg({
              id: endowmentId,
              beneficiary,
              acct_type: data.type,
              assets,
            }),
          ],
          JSON.stringify(meta)
        );

    await sendTx({
      msgs: [proposal],
      //Juno withdrawal
      ...propMeta,
      onSuccess: isJuno
        ? undefined //no need to POST to AWS if destination is juno
        : async (response, chain) =>
            await logProposal(
              {
                endowment_multisig: cw3,
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

  return {
    withdraw: handleSubmit(withdraw),
    isSubmitDisabled: !isValid || !isDirty || isSubmitting,
    type,
  };
}

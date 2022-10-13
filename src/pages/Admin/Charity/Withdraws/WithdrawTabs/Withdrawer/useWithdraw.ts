import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import { WithdrawMeta } from "pages/Admin/types";
import { Asset } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { invalidateJunoTags } from "services/juno";
import { adminTags, junoTags } from "services/juno/tags";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import Account from "contracts/Account";
import CW3Endowment from "contracts/CW3/CW3Endowment";
import { scaleToStr } from "helpers";
import { ap_wallets } from "constants/ap_wallets";
import { chainIds } from "constants/chainIds";
import { logWithdrawProposal } from "./logWithdrawProposal";

export default function useWithdraw() {
  const {
    handleSubmit,
    getValues,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<WithdrawValues>();

  const { cw3, endowmentId, endowment, successLink, successMessage } =
    useAdminResources();
  const { wallet } = useGetWallet();
  const dispatch = useSetter();

  const type = getValues("type");

  //NOTE: submit is disabled on Normal endowments with unmatured accounts
  function withdraw(data: WithdrawValues) {
    const assets: Asset[] = data.amounts.map(({ value, tokenId, type }) => ({
      info: type === "cw20" ? { cw20: tokenId } : { native: tokenId },
      amount: scaleToStr(value /** empty "" */ || "0"),
    }));

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
          `withdraw ${type} assets from endowment id: ${endowmentId}`,
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
        successLink,
        successMessage,
        onSuccess: isJuno
          ? undefined //no need to POST to AWS if destination is juno
          : (response) =>
              logWithdrawProposal({
                res: response,
                proposalLink: successLink,
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
    type,
  };
}

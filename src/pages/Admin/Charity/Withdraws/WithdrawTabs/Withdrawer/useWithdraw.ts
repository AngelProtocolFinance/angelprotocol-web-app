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
import CW3 from "contracts/CW3";
import CW3Ap from "contracts/CW3/CW3Ap";
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

  const { cw3, endowmentId, proposalLink, endowment } = useAdminResources();
  const { wallet } = useGetWallet();
  const dispatch = useSetter();

  const type = getValues("type");

  //NOTE: submit is disabled on Normal endowments with unmatured accounts
  function withdraw(data: WithdrawValues) {
    //filter + map
    const assets: Asset[] = data.amounts.map(({ value, tokenId, type }) => ({
      info: type === "cw20" ? { cw20: tokenId } : { native: tokenId },
      amount: scaleToStr(value /** empty "" */ || "0"),
    }));

    const isJuno = data.network === chainIds.juno;
    //if not juno, send to ap wallet (juno)
    const beneficiary = isJuno ? data.beneficiary : ap_wallets.juno;
    const isSendToApCW3 =
      endowment.endow_type === "Charity" && type === "locked";

    //used when withdraw doesn't need to go thru AP
    const account = new Account(wallet);
    const apCW3 = new CW3Ap(wallet);

    const embeddedWithdrawMsg = isSendToApCW3
      ? apCW3.createEmbeddedWithdrawLockMsg({
          assets,
          beneficiary,
          description: data.reason,
          endowment_id: endowmentId,
        })
      : account.createEmbeddedWithdrawMsg({
          id: endowmentId,
          beneficiary,
          acct_type: data.type,
          assets,
        });

    const meta: WithdrawMeta = {
      type: "acc_withdraw",
      data: {
        beneficiary: data.beneficiary,
      },
    };

    const endowCW3 = new CW3(wallet, cw3);
    const proposal = endowCW3.createProposalMsg(
      "withdraw proposal",
      `withdraw ${type} assets from endowment id: ${endowmentId}${
        isSendToApCW3
          ? ". Note: Proposal contents will be sent to Angel Protocol team for approval"
          : ""
      }`,
      [embeddedWithdrawMsg],
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
    type,
  };
}

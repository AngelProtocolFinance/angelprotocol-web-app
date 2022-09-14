import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import { WithdrawMeta } from "pages/Admin/types";
import { Asset, EndowmentDetails } from "types/contracts";
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
    getValues,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<WithdrawValues>();

  const { cw3, endowmentId, proposalLink } = useAdminResources();
  const { wallet } = useGetWallet();
  const dispatch = useSetter();

  const type = getValues("type");

  function withdraw(data: WithdrawValues) {
    //filter + map
    const assets: Asset[] = data.amounts.map(({ value, tokenId, type }) => ({
      info: type === "cw20" ? { cw20: tokenId } : { native: tokenId },
      amount: scaleToStr(value /** empty "" */ || "0"),
    }));

    const isJuno = data.network === chainIds.juno;
    //if not juno, send to ap wallet (juno)
    const beneficiary = isJuno ? data.beneficiary : ap_wallets.juno;

    const account = new Account(wallet);
    const msg = account.createEmbeddedWithdrawMsg({
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

function isNeedApPermission(
  { maturity_height = 0, withdraw_before_maturity }: EndowmentDetails,
  height: number
) {
  /**
   * TODO: factor in maturity_time, once AIF is integrated with which maturity_time can be set
   *.NOTE: for endow_type(Charity), withdraw_before_maturity is currently defaulted to False
   */
  return maturity_height < height && !withdraw_before_maturity;
}

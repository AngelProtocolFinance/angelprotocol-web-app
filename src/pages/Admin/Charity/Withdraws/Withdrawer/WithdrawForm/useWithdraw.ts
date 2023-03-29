import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import { WithdrawMeta } from "pages/Admin/types";
import { Asset } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Account from "contracts/Account";
import CW3Endowment from "contracts/CW3/CW3Endowment";
import { AccountDepositWithdrawEndowments } from "contracts/evm";
import useTxSender from "hooks/useTxSender";
import { scale, scaleToStr } from "helpers";
import { ap_wallets } from "constants/ap_wallets";
import { chainIds } from "constants/chainIds";
import useLogWithdrawProposal from "./useLogWithdrawProposal";

const endow_chain = chainIds.juno;

export default function useWithdraw() {
  const { handleSubmit, getValues } = useFormContext<WithdrawValues>();

  const { cw3, id, propMeta } = useAdminResources<"charity">();
  const { wallet } = useGetWallet();

  const sendTx = useTxSender();
  const logProposal = useLogWithdrawProposal(propMeta.successMeta);
  const type = getValues("type");

  //NOTE: submit is disabled on Normal endowments with unmatured accounts
  async function withdraw(data: WithdrawValues) {
    if (endow_chain === chainIds.polygon) {
      // native tokens not supported in contracts, see Angel-protocol-web-integration-readiness/contracts/core/struct.sol#221
      const [tokenAddresses, amounts]: [string[], number[]] =
        data.amounts.reduce(
          ([prevAddresses, prevAmounts], amount) => {
            if (amount.type === "cw20") {
              prevAddresses.push(amount.tokenId);
              prevAmounts.push(
                scale(amount.value /** empty str "" */ || "0").toNumber()
              );
            }
            return [prevAddresses, prevAmounts];
          },
          [new Array<string>(), new Array<number>()]
        );

      const isPolygon = data.network === chainIds.polygon;
      //if not polygon, send to ap wallet (polygon)
      const beneficiary = isPolygon
        ? data.beneficiary
        : ap_wallets.polygon_withdraw;
      const isSendToApCW3 = endow_type === "charity" && type === "locked";

      const withdrawTx = isSendToApCW3
        ? endowCW3.createWithdrawProposalMsg({
            endowment_id: id,
            assets,
            beneficiary,
            description: data.reason,
          })
        : //normal proposal when withdraw doesn't need to go thru AP
          AccountDepositWithdrawEndowments.withdraw.encode(
            id,
            type,
            beneficiary,
            tokenAddresses,
            amounts
          );

      await sendTx({
        content: {
          type: "evm",
          val: [withdrawTx],
          log: isSendToApCW3
            ? null
            : AccountDepositWithdrawEndowments.withdraw.log,
        },
        //Polygon withdrawal
        ...propMeta,
        onSuccess: isPolygon
          ? undefined //no need to POST to AWS if destination is polygon
          : async (response, chain) =>
              await logProposal(
                {
                  endowment_multisig: cw3,
                  proposal_chain_id: chainIds.polygon,
                  target_chain: data.network,
                  target_wallet: data.beneficiary,
                  type: data.type,
                },
                response,
                chain
              ),
      });
    }

    const assets: Asset[] = data.amounts.map(
      ({ value, tokenId, type: tokenType }) => ({
        info: tokenType === "cw20" ? { cw20: tokenId } : { native: tokenId },
        amount: scaleToStr(value /** empty "" */ || "0"),
      })
    );

    const isJuno = data.network === chainIds.juno;
    //if not juno, send to ap wallet (juno)
    const beneficiary = isJuno ? data.beneficiary : ap_wallets.juno_withdraw;

    const meta: WithdrawMeta = {
      type: "acc_withdraw",
      data: {
        beneficiary: data.beneficiary,
        assets,
      },
    };

    const account = new Account(wallet);
    const endowCW3 = new CW3Endowment(wallet, cw3);

    const proposal =
      // AST's won't even have the opportunity to submit a "withdraw from 'locked' funds" form
      type === "locked"
        ? endowCW3.createWithdrawProposalMsg({
            endowment_id: id,
            assets,
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
                assets,
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

  return handleSubmit(withdraw);
}

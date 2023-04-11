import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import { EndowmentDetails } from "types/contracts";
import { AccountType } from "types/contracts/evm";
import { SimulContractTx } from "types/evm";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { TxPrompt } from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { scaleToStr } from "helpers";
import { ap_wallets } from "constants/ap_wallets";
import { chainIds } from "constants/chainIds";
import useLogWithdrawProposal from "./useLogWithdrawProposal";

export default function useWithdraw() {
  const { handleSubmit } = useFormContext<WithdrawValues>();
  const { showModal } = useModalContext();

  const { multisig, id, propMeta, ...endow } = useAdminResources<"charity">();

  const { wallet } = useGetWallet();

  const sendTx = useTxSender();
  const logProposal = useLogWithdrawProposal(propMeta.successMeta);

  async function withdraw(data: WithdrawValues) {
    if (!wallet) {
      return showModal(TxPrompt, { error: "Wallet not connected" });
    }

    const { tx, isDirect, isPolygon } = constructTx(
      wallet.address,
      id,
      endow,
      data
    );

    await sendTx({
      content: { type: "evm", val: tx },
      ...propMeta,
      isAuthorized:
        propMeta.isAuthorized ||
        isDirect /** if whitelisted, could send this tx */,
      onSuccess: isPolygon
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

function constructTx(
  sender: string,
  id: number,
  endow: EndowmentDetails,
  wv: WithdrawValues
) {
  //construct amounts
  let addresses: string[] = [];
  let amounts: string[] = [];

  const accType: AccountType = wv.type === "locked" ? 0 : 1;
  for (const amount of wv.amounts) {
    addresses.push(amount.tokenId);
    amounts.push(scaleToStr(amount.value));
  }

  const isPolygon = wv.network === chainIds.polygon;
  const beneficiary = isPolygon ? wv.beneficiary : ap_wallets.polygon_withdraw;

  const isLockedCharity =
    endow.endow_type === "charity" && wv.type === "locked";

  const [data, dest] = isLockedCharity
    ? encodeTx("locked-withdraw.propose", {
        id,
        beneficiary,
        addresses,
        amounts,
      })
    : encodeTx("accounts.withdraw", {
        id,
        type: accType,
        beneficiary,
        addresses,
        amounts,
      });

  //prettier-ignore
  const isDirect =
    endow.endow_type === "normal" &&
    (
      (wv.type === "liquid" && endow.whitelistedBeneficiaries.includes(sender)) ||
      (wv.type === "locked" && endow.maturityWhitelist.includes(sender))
    );

  const tx: SimulContractTx = isDirect
    ? {
        from: sender,
        to: dest,
        data,
      }
    : createTx(sender, "multisig.submit-transaction", {
        multisig: endow.owner,
        title: `${wv.type} withdraw `,
        description: isLockedCharity
          ? wv.reason
          : `${wv.type} withdraw from endowment id: ${id}`,
        destination: dest,
        value: "0",
        data,
      });

  return { tx, isDirect, isPolygon };
}

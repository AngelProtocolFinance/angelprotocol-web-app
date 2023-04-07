import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import { SimulContractTx } from "types/evm";
import { useAdminResources } from "pages/Admin/Guard";
import { useErrorContext } from "contexts/ErrorContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import * as Account from "contracts/evm/Account";
import * as EndowmentMultiSig from "contracts/evm/EndowmentMultiSig";
import * as LockedWithdraw from "contracts/evm/LockedWithdraw";
import useTxSender from "hooks/useTxSender";
import { scale } from "helpers";
import { WalletDisconnectedError } from "errors/errors";
import { ap_wallets } from "constants/ap_wallets";
import { chainIds } from "constants/chainIds";
import useLogWithdrawProposal from "./useLogWithdrawProposal";

const accountsDiamond = "0xf725Ff6235D53dA06Acb4a70AA33206a1447D550";
const lockedWithdrawAddress = ""; // not yet sure where to find this as it's missing from `contract-address.json`
const multiSigWalletImplementation =
  "0x7D8F4C57582abBbfa977541d740908b983A39525";

export default function useWithdraw() {
  const { handleSubmit, getValues } = useFormContext<WithdrawValues>();

  const { cw3, id, propMeta } = useAdminResources<"charity">();
  const { wallet } = useGetWallet();
  const { handleError } = useErrorContext();

  const sendTx = useTxSender();
  const logProposal = useLogWithdrawProposal(propMeta.successMeta);
  const type = getValues("type");

  async function withdraw(data: WithdrawValues) {
    if (!wallet) {
      return handleError(new WalletDisconnectedError());
    }

    const [tokenAddresses, amounts]: [string[], number[]] = data.amounts.reduce(
      ([prevAddresses, prevAmounts], amount) => {
        // native tokens not supported in contracts, see Angel-protocol-web-integration-readiness/contracts/core/struct.sol#221
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

    const isWithdrawalToPolygon = data.network === chainIds.polygon;
    //if not polygon, send to ap wallet (polygon)
    const beneficiary = isWithdrawalToPolygon
      ? data.beneficiary
      : ap_wallets.polygon_withdraw;

    // AST's would not even be able to submit a "locked" withdrawal from UI
    const isSendToApMultisig = type === "locked";

    // logic was created by looking at how appropriate `` > tests are constructed, see:
    // - liquid withdrawal: test/integration-test/EndowmentMembersCharity.Accounts.test.js#179
    // - locked withdrawal: test/integration-test/EndowmentMembersCharity.Accounts.test.js#279
    const withdrawTx: SimulContractTx = isSendToApMultisig
      ? {
          from: wallet.address,
          to: multiSigWalletImplementation,
          data: EndowmentMultiSig.submitTransaction.encode(
            "Locked Withdraw Proposal",
            `withdraw locked assets from endowment id: ${id}`,
            lockedWithdrawAddress,
            0,
            LockedWithdraw.propose.encode(
              id,
              beneficiary,
              tokenAddresses,
              amounts
            )
          ),
        }
      : //normal proposal when withdraw doesn't need to go thru AP
        {
          from: wallet.address,
          to: multiSigWalletImplementation,
          data: EndowmentMultiSig.submitTransaction.encode(
            "Liquid Withdraw proposal",
            `withdraw liquid assets from endowment id: ${id}`,
            accountsDiamond,
            0,
            Account.withdraw.encode(
              id,
              type,
              beneficiary,
              tokenAddresses,
              amounts
            )
          ),
        };

    await sendTx({
      content: {
        type: "evm",
        val: withdrawTx,
        log: isSendToApMultisig
          ? LockedWithdraw.propose.log
          : EndowmentMultiSig.submitTransaction.log,
      },
      //Polygon withdrawal
      ...propMeta,
      onSuccess: isWithdrawalToPolygon
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

  return handleSubmit(withdraw);
}

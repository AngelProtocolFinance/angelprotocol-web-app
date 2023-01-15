import { Estimate } from "./types";
import type { MsgExecuteContract } from "@keplr-wallet/proto-types/cosmwasm/wasm/v1/tx";
import { Msg } from "types/cosmos";
import { WithCosmosWallet } from "contexts/WalletContext";
import { SubmitStep } from "slices/gift";
import CW20 from "contracts/CW20";
import GiftCard from "contracts/GiftCard";
import { extractFeeAmount, logger, scaleToStr } from "helpers";
import { estimateGas } from "helpers/cosmos/estimateGas";
import { contracts } from "constants/contracts";

export async function estimateTx({
  details: { token, recipient, tokens },
  wallet,
}: WithCosmosWallet<SubmitStep>): Promise<Estimate | null> {
  const native = tokens[0];
  try {
    const gcContract = new GiftCard(wallet);
    let msg: Msg<MsgExecuteContract>;
    if (token.type === "juno-native" || token.type === "ibc") {
      msg = gcContract.createDepositMsg(recipient, [
        { amount: scaleToStr(token.amount), denom: token.token_id },
      ]);
      /** cw20: this estimate should not run when chain is not juno */
    } else {
      const contract = new CW20(wallet, token.token_id);
      msg = contract.createSendMsg(
        token.amount,
        contracts.gift_cards,
        gcContract.createDepositObject(recipient)
      );
    }

    const { feeAmount, doc } = await estimateGas([msg], wallet);

    return {
      fee: { amount: feeAmount, symbol: native.symbol },
      doc,
    };
  } catch (err) {
    logger.error(err);
    return null;
  }
}

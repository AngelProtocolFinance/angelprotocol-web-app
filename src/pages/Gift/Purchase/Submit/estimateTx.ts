import { Estimate } from "types/tx";
import { WalletState } from "contexts/WalletContext";
import { SubmitStep } from "slices/gift";
import GiftCard from "contracts/GiftCard";
import createCosmosMsg from "contracts/createCosmosMsg";
import { logger, scaleToStr } from "helpers";
import { estimateTx as estimateGas } from "helpers/tx";
import { contracts } from "constants/contracts";

export async function estimateTx({
  details: { token, recipient },
  wallet,
}: SubmitStep & {
  wallet: WalletState;
}): Promise<Estimate | null> {
  try {
    const gcContract = new GiftCard(wallet);
    const scaled = scaleToStr(token.amount, token.decimals);

    const msg =
      token.type === "juno-native" || token.type === "ibc"
        ? gcContract.createDepositMsg(recipient, [
            { amount: scaled, denom: token.token_id },
          ])
        : createCosmosMsg(wallet.address, "cw20.send", {
            cw20: token.token_id,
            contract: contracts["gift-card"],
            amount: scaled,
            msg: gcContract.createDepositObject(recipient),
          });

    return estimateGas(
      { type: "cosmos", val: [msg], attribute: "deposit_id" },
      wallet
    );
  } catch (err) {
    logger.error(err);
    return null;
  }
}

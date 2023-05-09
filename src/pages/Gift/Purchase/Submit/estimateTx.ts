import type { BigNumber } from "@ethersproject/bignumber";
import { Asset } from "types/contracts";
import { Estimate } from "types/tx";
import { WalletState } from "contexts/WalletContext";
import { SubmitStep } from "slices/gift";
import { createTx } from "contracts/createTx/createTx";
import { giftCard } from "contracts/evm/gift-card";
import { logger, scale } from "helpers";
import { estimateTx as estimateGas } from "helpers/tx";
import { ADDRESS_ZERO } from "constants/evm";

export async function estimateTx({
  details: { token, recipient },
  wallet,
}: SubmitStep & {
  wallet: WalletState;
}): Promise<Estimate | null> {
  try {
    // const gcContract = new GiftCard(wallet);
    const scaled = scale(token.amount, token.decimals).toHex();
    const erc20: Asset = {
      info: 0,
      amount: scaled,
      addr: token.token_id,
      name: "",
    };

    const to = recipient || ADDRESS_ZERO;
    const tx =
      token.type === "evm-native"
        ? createTx(
            wallet.address,
            "gift-card.deposit-native",
            {
              from: wallet.address,
              to,
            },
            scaled
          )
        : createTx(wallet.address, "gift-card.deposit-erc20", {
            from: wallet.address,
            to,
            asset: erc20,
          });

    return estimateGas(
      {
        type: "evm",
        val: tx,
        log(logs) {
          const ev = giftCard.getEvent("GiftCardsUpdateDeposit");
          const topic = giftCard.getEventTopic(ev);
          const log = logs.find((log) => log.topics.includes(topic));
          if (!log) return null;
          const [id] = giftCard.decodeEventLog(ev, log.data, log.topics);
          return (id as BigNumber).toString();
        },
      },
      wallet
    );
  } catch (err) {
    logger.error(err);
    return null;
  }
}

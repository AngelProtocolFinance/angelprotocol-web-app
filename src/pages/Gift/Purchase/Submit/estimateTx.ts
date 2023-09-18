import type { BigNumber } from "@ethersproject/bignumber";
import { contracts } from "constant/contracts";
import { ADDRESS_ZERO } from "constant/evm";
import { Asset } from "types/contracts";
import { Estimate } from "types/tx";
import { queryContract } from "services/juno/queryContract";
import { WalletState } from "contexts/WalletContext";
import { SubmitStep } from "slices/gift";
import { createTx } from "contracts/createTx/createTx";
import { giftCard } from "contracts/evm/gift-card";
import { logger, scale } from "helpers";
import { estimateTx as estimateGas } from "helpers/tx";

export async function estimateTx({
  details: { token, recipient },
  wallet,
}: SubmitStep & {
  wallet: WalletState;
}): Promise<Estimate | null | "for-approval"> {
  try {
    const scaled = scale(token.amount, token.decimals);

    if (token.type === "erc20") {
      const allowance = await queryContract(
        "erc20.allowance",
        {
          erc20: token.token_id,
          owner: wallet.address,
          spender: contracts["gift-card"],
        },
        wallet.chain.rpc_url
      );
      if (scaled.gt(allowance)) {
        return "for-approval";
      }
    }

    const erc20: Asset = {
      info: 0,
      amount: scaled.toString(),
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
            scaled.toHex()
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

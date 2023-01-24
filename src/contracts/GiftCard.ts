import { Coin } from "@cosmjs/proto-signing";
import { Asset } from "types/contracts";
import { TokenWithAmount } from "types/slices";
import { roundDown, scaleToStr } from "helpers";
import { contracts } from "constants/contracts";
import Contract from "./Contract";

export default class GiftCard extends Contract {
  private static address = contracts.gift_cards;

  createDepositObject(recipient: string) {
    return {
      deposit: recipient
        ? {
            to_address: recipient,
          }
        : /** dont add to_address when recipient is empty */
          {},
    };
  }

  createDepositMsg(recipient: string, funds: Coin[]) {
    return this.createExecuteContractMsg(
      GiftCard.address,
      this.createDepositObject(recipient),
      funds
    );
  }

  createSpendMsg(
    endowId: number,
    amount: number,
    token: TokenWithAmount,
    pctLiqSplit: string
  ) {
    const asset: Asset = {
      amount: scaleToStr(amount, token.decimals),
      info:
        token.type === "cw20"
          ? { cw20: token.token_id }
          : { native: token.token_id },
    };
    const liqPct = roundDown(+pctLiqSplit / 100);
    const lockPct = roundDown(1 - +pctLiqSplit / 100);

    return this.createExecuteContractMsg(GiftCard.address, {
      spend: {
        asset,
        endow_id: endowId,
        locked_percentage: lockPct,
        liquid_percentage: liqPct,
      },
    });
  }
}

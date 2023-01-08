import { Coin } from "@cosmjs/proto-signing";
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
}

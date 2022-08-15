import Decimal from "decimal.js";
import { Airdrops } from "types/server/aws";
import Contract from "./Contract";
import Gov from "./Gov";

export default class Airdrop extends Contract {
  createAirdropClaimMsg(airdrops: Airdrops, is_stake = false) {
    const claimMsgs = airdrops.map(({ stage, haloTokens, proof }) =>
      this.createExecuteContractMsg({
        claim: { stage, amount: haloTokens, proof },
      })
    );
    if (is_stake) {
      const totalClaimable = airdrops.reduce(
        (result, airdrop) =>
          new Decimal(airdrop.haloTokens).div(1e6).add(result),
        new Decimal(0)
      );
      const govContract = new Gov(this.wallet);
      const stake_msg = govContract.createGovStakeMsg(
        totalClaimable.toString()
      );
      claimMsgs.push(stake_msg);
    }

    return claimMsgs;
  }
}

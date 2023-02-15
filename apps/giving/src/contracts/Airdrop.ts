import Decimal from "decimal.js";
import { Airdrops } from "types/aws";
import { condense } from "helpers";
import { contracts } from "constants/contracts";
import Contract from "./Contract";
import Gov from "./Gov";

export default class Airdrop extends Contract {
  private static address = contracts.airdrop;

  createAirdropClaimMsg(airdrops: Airdrops, is_stake = false) {
    const claimMsgs = airdrops.map(({ stage, haloTokens, proof }) =>
      this.createExecuteContractMsg(Airdrop.address, {
        claim: { stage, amount: haloTokens, proof },
      })
    );
    if (is_stake) {
      const totalClaimable = airdrops.reduce(
        (result, airdrop) => condense(airdrop.haloTokens).add(result),
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

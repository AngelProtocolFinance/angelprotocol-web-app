import Decimal from "decimal.js";
import { ContractQueryArgs as CQA } from "services/types";
import { Airdrops } from "types/server/aws";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { condense } from "helpers";
import { contracts } from "constants/contracts";
import Contract from "./Contract";
import Gov from "./Gov";

export default class Airdrop extends Contract {
  isAirDropClaimed: (stage: number) => CQA;

  constructor(wallet: WalletState | undefined) {
    super(wallet, contracts.airdrop);
    this.isAirDropClaimed = (stage) => ({
      address: this.contractAddress,
      msg: { is_claimed: { stage, address: this.walletAddress } },
    });
  }

  createAirdropClaimMsg(airdrops: Airdrops, is_stake = false) {
    const claimMsgs = airdrops.map(({ stage, haloTokens, proof }) =>
      this.createExecuteContractMsg({
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

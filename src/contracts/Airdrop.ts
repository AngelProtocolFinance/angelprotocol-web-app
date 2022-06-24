import { MsgExecuteContract } from "@terra-money/terra.js";
import Decimal from "decimal.js";
import { ContractQueryArgs as CQA } from "services/types";
import { Airdrops } from "types/server/aws";
import { contracts } from "constants/contracts";
import Contract from "./Contract";
import Gov from "./Gov";

export default class Airdrop extends Contract {
  airdropContractAddr: string;
  isAirDropClaimed: (stage: number) => CQA;

  constructor(walletAddr?: string) {
    super(walletAddr);
    this.airdropContractAddr = contracts.airdrop;
    this.isAirDropClaimed = (stage) => ({
      address: this.airdropContractAddr,
      msg: { is_claimed: { stage, address: this.walletAddr } },
    });
  }

  createAirdropClaimMsg(airdrops: Airdrops, is_stake = false) {
    this.checkWallet();
    const claimMsgs = airdrops.map(
      ({ stage, haloTokens, proof }) =>
        new MsgExecuteContract(this.walletAddr!, this.airdropContractAddr, {
          claim: { stage, amount: haloTokens, proof },
        })
    );
    if (is_stake) {
      const totalClaimable = airdrops.reduce(
        (result, airdrop) =>
          new Decimal(airdrop.haloTokens).div(1e6).add(result),
        new Decimal(0)
      );
      const govContract = new Gov(this.walletAddr);
      const stake_msg = govContract.createGovStakeMsg(
        totalClaimable.toString()
      );
      claimMsgs.push(stake_msg);
    }

    return claimMsgs;
  }
}

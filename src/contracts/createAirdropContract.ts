import { MsgExecuteContract } from "@terra-money/terra.js";
import Decimal from "decimal.js";
import { ContractQueryArgs } from "services/types";
import { Airdrops } from "types/server/aws";
import { contracts } from "constants/contracts";
import { createGovContract } from "./createGovContract";

const AIRDROP_CONTRACT_ADDR = contracts.airdrop;

export function createAirdropContract(walletAddress = ""): AirdropContract {
  const isAirDropClaimed = (stage: number) => ({
    address: AIRDROP_CONTRACT_ADDR,
    msg: { is_claimed: { stage, address: walletAddress } },
  });

  function createAirdropClaimMsg(
    airdrops: Airdrops,
    is_stake = false
  ): MsgExecuteContract[] {
    const claimMsgs = airdrops.map(
      ({ stage, haloTokens, proof }) =>
        new MsgExecuteContract(walletAddress, AIRDROP_CONTRACT_ADDR, {
          claim: { stage, amount: haloTokens, proof },
        })
    );
    if (is_stake) {
      const totalClaimable = airdrops.reduce(
        (result, airdrop) =>
          new Decimal(airdrop.haloTokens).div(1e6).add(result),
        new Decimal(0)
      );
      const govContract = createGovContract(walletAddress);
      const stake_msg = govContract.createGovStakeMsg(
        totalClaimable.toString()
      );
      claimMsgs.push(stake_msg);
    }

    return claimMsgs;
  }

  return {
    airdropContractAddr: AIRDROP_CONTRACT_ADDR,
    isAirDropClaimed,
    createAirdropClaimMsg,
  };
}

export type AirdropContract = {
  airdropContractAddr: string;
  createAirdropClaimMsg: (
    airdrops: Airdrops,
    is_stake?: boolean
  ) => MsgExecuteContract[];
  isAirDropClaimed: (stage: number) => ContractQueryArgs;
};

import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { MsgExecuteContract } from "@terra-money/terra.js";
import Decimal from "decimal.js";
import { ContractQueryArgs as CQA } from "services/types";
import { Airdrops } from "types/server/aws";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { contracts } from "constants/contracts";
import { createBaseContract } from "./createBaseContract";

export async function createAirdropContract(wallet: WalletState) {
  const baseContract = await createBaseContract(wallet);
  const airdropContractAddr = contracts.airdrop;

  function createAirdropClaimMsg(
    airdrops: Airdrops,
    is_stake = false
  ): MsgExecuteContract[] {
    const claimMsgs = airdrops.map(
      ({ stage, haloTokens, proof }) =>
        new MsgExecuteContract(this.walletAddr, this.airdropContractAddr, {
          claim: { stage, amount: haloTokens, proof },
        })
    );
    if (is_stake) {
      const totalClaimable = airdrops.reduce(
        (result, airdrop) =>
          new Decimal(airdrop.haloTokens).div(1e6).add(result),
        new Decimal(0)
      );
      const govContract = new Gov(this.client, this.walletAddr);
      const stake_msg = govContract.createGovStakeMsg(
        totalClaimable.toString()
      );
      claimMsgs.push(stake_msg);
    }

    return claimMsgs;
  }
}

export type AirdropContract = {
  airdropContractAddr: string;
  createAirdropClaimMsg: (
    airdrops: Airdrops,
    is_stake?: boolean
  ) => MsgExecuteContract[];
  isAirDropClaimed: (stage: number) => CQA;
};

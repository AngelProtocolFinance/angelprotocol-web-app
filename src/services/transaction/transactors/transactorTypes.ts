import { ConnectedWallet } from "@terra-dev/wallet-types";
import { CreateTxOptions } from "@terra-money/terra.js";
import { TransactionRequest } from "@ethersproject/abstract-provider/src.ts";
import { DonateValues } from "components/Transactors/Donater/types";
import { CreatePollValues } from "components/Transactors/Poller/types";
import { SwapValues } from "components/Transactors/Swapper/types";
import { HaloStakingValues } from "components/Transactors/Staker/types";
import { WithdrawValues } from "components/Transactors/Withdraw/types";
import { Airdrops } from "services/aws/airdrop/types";

export type TerraArgs = {
  tx: CreateTxOptions;
  wallet: ConnectedWallet | undefined;
};
export type UnEstimatedTerraArg = { wallet: ConnectedWallet | undefined };

export type TerraDonateArgs = TerraArgs & { donateValues: DonateValues };
export type HaloStakingArgs = TerraArgs & { stakingValues: HaloStakingValues };
export type SwapArgs = TerraArgs & { swapValues: SwapValues };
export type WithdrawArgs = TerraArgs & { withdrawValues: WithdrawValues };

export type CreatePollArgs = UnEstimatedTerraArg & {
  createPollValues: CreatePollValues;
};
export type EndPollArgs = UnEstimatedTerraArg & { pollId: number };

export type EthDonateArgs = {
  tx: TransactionRequest;
  donateValues: DonateValues;
};
export type ClaimAirdropArgs = {
  wallet: ConnectedWallet | undefined;
  isStake: boolean;
  airdrops: Airdrops;
  ustBalance: number;
};

import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Keplr } from "@keplr-wallet/types";
import {
  AggregatedQuery,
  ContractQueryArgs,
  MultiContractQueryArgs,
} from "services/types";
import { Airdrops } from "types/server/aws";
import { WalletState } from "contexts/WalletContext/WalletContext";
import configureCosmosClient from "helpers/configureCosmosClient";
import toBase64 from "helpers/toBase64";
import { WalletDisconnectError } from "errors/errors";
import { contracts } from "constants/contracts";
import Account from "./Account";
import Airdrop from "./Airdrop";
import Registrar from "./Registrar";

export async function createMulticallContract(
  wallet: WalletState
): Promise<MulticallContract> {
  if (!wallet) {
    throw new WalletDisconnectError();
  }
  const signer = (wallet.provider as Keplr).getOfflineSigner(wallet.chainId);
  const { client, address } = await configureCosmosClient(signer);

  const balanceAndRates = (endowmentAddr: string) => ({
    address: address,
    msg: constructAggregatedQuery([
      new Account(client, endowmentAddr, walletAddr).balance,
      registrarContract.vaultsRate,
    ]),
  });

  const airDropInquiries = (airdrops: Airdrops) => ({
    address: address,
    msg: constructAggregatedQuery(
      airdrops.map((airdrop) => airdropContract.isAirDropClaimed(airdrop.stage))
    ),
  });
}

function constructAggregatedQuery(
  queries: ContractQueryArgs[]
): AggregatedQuery {
  return {
    aggregate: {
      queries: queries.map((query) => ({
        address: query.address,
        data: toBase64(query.msg),
      })),
    },
  };
}

export type MulticallContract = {
  client: SigningCosmWasmClient;
  walletAddr?: string;
  address: string;
  registrarContract: Registrar;
  airdropContract: Airdrop;
  balanceAndRates: (endowmentAddr: string) => MultiContractQueryArgs;
  airDropInquiries: (airdrops: Airdrops) => MultiContractQueryArgs;
};

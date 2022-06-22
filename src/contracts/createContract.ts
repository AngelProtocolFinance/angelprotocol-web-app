import { EncodeObject } from "@cosmjs/proto-signing";
import { Coin } from "@cosmjs/stargate";
import { Keplr } from "@keplr-wallet/types";
import { EmbeddedBankMsg, EmbeddedWasmMsg } from "types/server/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import configureCosmosClient from "helpers/configureCosmosClient";
import { WalletDisconnectError } from "errors/errors";

export default async function createContract(wallet: WalletState) {
  const signer = (wallet.provider as Keplr).getOfflineSigner(wallet.chainId);
  const { client, address } = await configureCosmosClient(signer);

  function checkWallet() {
    if (!address) {
      throw new WalletDisconnectError();
    }
  }

  function createEmbeddedBankMsg(funds: Coin[], to: string): EmbeddedBankMsg {
    return {
      bank: {
        send: {
          to_address: to,
          amount: funds,
        },
      },
    };
  }

  function createEmbeddedWasmMsg(
    funds: Coin[],
    to: string,
    msg: object
  ): EmbeddedWasmMsg {
    const encodedMsg = btoa(JSON.stringify(msg));
    return {
      wasm: {
        execute: {
          contract_addr: to,
          funds,
          msg: encodedMsg,
        },
      },
    };
  }

  async function estimateFee(msgs: readonly EncodeObject[]): Promise<number> {
    checkWallet();
    return await client.simulate(address!, msgs, undefined);
  }

  //for on-demand query, use RTK where possible
  async function query<T>(
    source: string,
    message: Record<string, unknown>
  ): Promise<T> {
    const jsonObject = await client.queryContractSmart(source, message);
    return JSON.parse(jsonObject) as T;
  }

  return {
    client,
    walletAddress: address,
    checkWallet,
    createEmbeddedBankMsg,
    createEmbeddedWasmMsg,
    estimateFee,
    query,
  };
}

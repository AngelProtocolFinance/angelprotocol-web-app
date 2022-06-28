import { Coin } from "@cosmjs/proto-signing";
import { MsgExecuteContract } from "@terra-money/terra.js";
import Decimal from "decimal.js";
import { ContractQueryArgs } from "services/types";
import { EmbeddedBankMsg, EmbeddedWasmMsg } from "types/server/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import createEmbeddedWasmMsg from "helpers/createEmbeddedWasmMsg";
import toBase64 from "helpers/toBase64";
import { BaseContract, createBaseContract } from "./createBaseContract";

export function createCW20Contract(
  wallet: WalletState | undefined,
  cw20ContractAddr: string
): CW20Contract {
  const baseContract = createBaseContract(wallet);
  const walletAddress = wallet?.address || "";

  const info = {
    address: cw20ContractAddr,
    msg: {
      token_info: {},
    },
  };

  const balance = (address: string) => ({
    address: cw20ContractAddr,
    msg: { balance: { address } },
  });

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

  function createEmbeddedTransferMsg(
    amount: number,
    recipient: string
  ): EmbeddedWasmMsg {
    return createEmbeddedWasmMsg([], cw20ContractAddr, {
      transfer: {
        //convert to uamount
        amount: new Decimal(amount).mul(1e6).divToInt(1).toString(),
        recipient,
      },
    });
  }

  function createTransferMsg(
    amount: number,
    recipient: string
  ): MsgExecuteContract {
    return new MsgExecuteContract(walletAddress, cw20ContractAddr, {
      transfer: {
        //convert to uamount
        amount: new Decimal(amount).mul(1e6).divToInt(1).toString(),
        recipient,
      },
    });
  }

  function createSendMsg(
    amount: number | string,
    msgReceiverAddr: string,
    msg: object
  ): MsgExecuteContract {
    return new MsgExecuteContract(walletAddress, cw20ContractAddr, {
      send: {
        //convert to uamount
        amount: new Decimal(amount).mul(1e6).divToInt(1).toString(),
        contract: msgReceiverAddr,
        msg: toBase64(msg),
      },
    });
  }

  return {
    ...baseContract,
    info,
    balance,
    createEmbeddedBankMsg,
    createEmbeddedTransferMsg,
    createSendMsg,
    createTransferMsg,
  };
}

export type CW20Contract = BaseContract & {
  info: ContractQueryArgs;
  balance: (address: string) => ContractQueryArgs;
  createEmbeddedBankMsg: (funds: Coin[], to: string) => EmbeddedBankMsg;
  createEmbeddedTransferMsg: (
    amount: number,
    recipient: string
  ) => EmbeddedWasmMsg;
  createSendMsg: (
    amount: number | string,
    msgReceiverAddr: string,
    msg: object
  ) => MsgExecuteContract;
  createTransferMsg: (amount: number, recipient: string) => MsgExecuteContract;
};

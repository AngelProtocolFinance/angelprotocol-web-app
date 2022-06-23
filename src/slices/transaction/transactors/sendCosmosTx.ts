import {
  MsgExecuteContractEncodeObject,
  SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import {
  MsgSendEncodeObject,
  SigningStargateClient,
  StdFee,
} from "@cosmjs/stargate";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateTxOptions } from "@terra-money/terra.js";
import {
  SendCosmosTxArgs,
  StageUpdator,
  TerraSendArgs,
} from "slices/transaction/types";
import { Dwindow } from "types/ethereum";
import { CosmosSimulArgs } from "types/server/contracts";
import Contract from "contracts/Contract";
import CosmosAdmin from "contracts/CosmosAdmin";
import extractFeeNum from "helpers/extractFeeNum";
import handleTerraError from "helpers/handleTerraError";
import { pollTerraTxInfo } from "helpers/pollTerraTxInfo";
import { postTerraTx } from "helpers/postTerraTx";
import { WalletDisconnectError } from "errors/errors";
import { chainIDs } from "constants/chainIDs";
import { terraChainId } from "constants/env";
import { junoLcdUrl, junoRpcUrl } from "constants/urls";
import transactionSlice, { setStage } from "../transactionSlice";

export const sendCosmosTx = createAsyncThunk(
  `${transactionSlice.name}/sendCosmosTx`,
  async (args: SendCosmosTxArgs, { dispatch }) => {
    const updateTx: StageUpdator = (update) => {
      dispatch(setStage(update));
    };

    try {
      if (!args.wallet) {
        throw new WalletDisconnectError();
      }

      updateTx({ step: "submit", message: "Submitting transaction..." });
      const dwindow = window as Dwindow;
      const offlineSigner = dwindow.keplr!.getOfflineSigner(chainIDs.juno_test);
      const client = await SigningCosmWasmClient.connectWithSigner(
        junoRpcUrl,
        offlineSigner
      );
      const simulArgs: CosmosSimulArgs = [
        args.wallet.address,
        args.msgs,
        undefined,
      ];

      const gas = await client.simulate(...simulArgs);

      const fee: StdFee = {
        amount: [{ denom: "ujunox", amount: "0.025" }],
        gas: `${gas * 1.5}`,
      };

      const [a, b, c] = simulArgs;
      const response = await client.signAndBroadcast(a, b, fee, c);

      console.log(response.transactionHash);

      // //run fee estimation for on-demand created tx
      // const contract = new Contract(args.wallet.address);
      // const fee = await contract.estimateFee(args.msgs);
      // const feeNum = extractFeeNum(fee);

      // if (feeNum > args.wallet.displayCoin.balance) {
      //   updateTx({
      //     step: "error",
      //     message: `Not enough balance to pay for fees`,
      //   });
      //   return;
      // }

      // const response = await postTerraTx(tx);

      // updateTx({
      //   step: "broadcast",
      //   message: "Waiting for transaction result",
      //   txHash: response.result.txhash,
      //   chainId: terraChainId,
      // });

      // if (response.success) {
      //   const txInfo = await pollTerraTxInfo(response.result.txhash, 7, 1000);
      //   if (!txInfo.code) {
      //     updateTx({
      //       step: "success",
      //       message: args.successMessage || "Transaction successful!",
      //       txHash: txInfo.txhash,
      //       txInfo: txInfo,
      //       chainId: terraChainId,
      //       successLink: args.successLink,
      //     });

      //     //invalidate cache entries
      //     for (const tagPayload of args.tagPayloads || []) {
      //       dispatch(tagPayload);
      //     }
      //   } else {
      //     updateTx({
      //       step: "error",
      //       message: "Transaction failed",
      //       txHash: txInfo.txhash,
      //       chainId: terraChainId,
      //     });
      //   }
      // } else {
      //   updateTx({
      //     step: "error",
      //     message: "Transaction failed",
      //     txHash: response.result.txhash,
      //     chainId: terraChainId,
      //   });
      // }
    } catch (err) {
      console.log(err);
      handleTerraError(err, updateTx);
    }
  }
);

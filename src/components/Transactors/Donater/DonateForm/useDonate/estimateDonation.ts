import { EncodeObject } from "@cosmjs/proto-signing";
import { TransactionRequest } from "@ethersproject/abstract-provider";
import {
  Coin,
  CreateTxOptions,
  MsgExecuteContract,
  MsgSend,
} from "@terra-money/terra.js";
import ERC20Abi from "abi/ERC20.json";
import { ethers } from "ethers";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { Step3 } from "slices/donation";
import Account from "contracts/Account";
import CW20 from "contracts/CW20";
import { extractFeeAmount, getProvider, scaleToStr } from "helpers";
import { ap_wallets } from "constants/ap_wallets";
import estimateTerraFee from "./estimateTerraFee";

type Fee = { amount: number; symbol: string };
type Tx =
  | { type: "cosmos"; val: EncodeObject }
  | { type: "terra"; val: CreateTxOptions }
  | { type: "evm"; val: TransactionRequest };

export async function estimateDonation({
  details: { token },
  wallet,
}: Step3 & { wallet: WalletState }): Promise<{ fee: Fee; tx: Tx }> {
  const { chain } = wallet;
  const { native_currency } = chain;

  if (chain.type === "juno-native") {
    if (token.type === "juno-native" || token.type === "ibc") {
      const contract = new Account(wallet);
      const msg = contract.createTransferNativeMsg(
        token.amount,
        ap_wallets.juno_deposit,
        token.token_id
      );

      const feeAmount = extractFeeAmount(
        await contract.estimateFee([msg]),
        native_currency.token_id
      );

      return {
        fee: { amount: feeAmount, symbol: native_currency.symbol },
        tx: { type: "cosmos", val: msg },
      };
    } else {
      const contract = new CW20(wallet, token.token_id);
      const msg = contract.createTransferMsg(
        token.amount,
        ap_wallets.juno_deposit
      );
      const feeAmount = extractFeeAmount(
        await contract.estimateFee([msg]),
        native_currency.token_id
      );

      return {
        fee: { amount: feeAmount, symbol: native_currency.symbol },
        tx: { type: "cosmos", val: msg },
      };
    }
  }
  // terra native transaction, send or contract interaction
  else if (chain.type === "terra-native") {
    const amount = scaleToStr(token.amount);

    if (token.type === "terra-native" || token.type === "ibc") {
      const msg = new MsgSend(wallet.address, ap_wallets.terra, [
        new Coin(token.amount, amount),
      ]);

      const fee = await estimateTerraFee(wallet, [msg]);
      const feeAmount = extractFeeAmount(fee, native_currency.token_id);

      return {
        fee: { amount: feeAmount, symbol: native_currency.symbol },
        tx: { type: "terra", val: { fee, msgs: [msg] } },
      };
    } else {
      const msg = new MsgExecuteContract(wallet.address, token.token_id, {
        transfer: {
          amount,
          recipient: ap_wallets.terra,
        },
      });
      const fee = await estimateTerraFee(wallet, [msg]);
      const feeAmount = extractFeeAmount(fee, native_currency.token_id);

      return {
        fee: { amount: feeAmount, symbol: native_currency.symbol },
        tx: { type: "terra", val: { fee, msgs: [msg] } },
      };
    }
  }
  // evm transactions
  else {
    const provider = new ethers.providers.Web3Provider(
      getProvider(wallet.providerId) as any
    );
    //no network request
    const signer = provider.getSigner();
    const sender = await signer.getAddress();
    const gasPrice = await signer.getGasPrice();
    const wei_amount = ethers.utils.parseEther(`${token.amount}`);

    const tx: TransactionRequest = {
      from: sender,
      to: ap_wallets.eth,
      value: wei_amount,
    };

    let feeAmount = 0;
    if (token.type === "evm-native") {
      const gasLimit = await signer.estimateGas(tx);
      const minFee = gasLimit.mul(gasPrice);
      feeAmount = parseFloat(ethers.utils.formatUnits(minFee, token.decimals));
    } else {
      const ER20Contract: any = new ethers.Contract(
        token.token_id,
        ERC20Abi,
        signer
      );
      const gasLimit = await ER20Contract.estimateGas.transfer(
        tx.to,
        wei_amount
      );
      const minFee = gasLimit.mul(gasPrice);
      feeAmount = parseFloat(ethers.utils.formatUnits(minFee, token.decimals));
    }

    return {
      fee: { amount: feeAmount, symbol: native_currency.symbol },
      tx: { type: "evm", val: tx },
    };
  }
}

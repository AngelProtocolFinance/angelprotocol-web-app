import { TransactionRequest } from "@ethersproject/abstract-provider";
import { Coin, MsgExecuteContract, MsgSend } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import ERC20Abi from "abi/ERC20.json";
import { ethers } from "ethers";
import { Estimate } from "./types";
import { WalletState } from "contexts/WalletContext";
import { SubmitStep } from "slices/donation";
import Account from "contracts/Account";
import CW20 from "contracts/CW20";
import { extractFeeAmount, getProvider, logger, scaleToStr } from "helpers";
import { ap_wallets } from "constants/ap_wallets";
import estimateTerraFee from "./estimateTerraFee";

export async function estimateDonation({
  details: { token },
  wallet,
  terraWallet,
}: SubmitStep & {
  wallet: WalletState;
  terraWallet?: ConnectedWallet;
}): Promise<Estimate | null> {
  const { chain } = wallet;
  const { native_currency } = chain;

  try {
    if (chain.type === "juno-native") {
      if (token.type === "juno-native" || token.type === "ibc") {
        const contract = new Account(wallet);
        const msg = contract.createTransferNativeMsg(
          token.amount,
          ap_wallets.juno_deposit,
          token.token_id
        );

        const fee = await contract.estimateFee([msg]);
        const feeAmount = extractFeeAmount(fee, native_currency.token_id);

        return {
          fee: { amount: feeAmount, symbol: native_currency.symbol },
          tx: { type: "cosmos", val: { fee, msgs: [msg] } },
        };
      } else {
        const contract = new CW20(wallet, token.token_id);
        const msg = contract.createTransferMsg(
          token.amount,
          ap_wallets.juno_deposit
        );
        const fee = await contract.estimateFee([msg]);
        const feeAmount = extractFeeAmount(fee, native_currency.token_id);

        return {
          fee: { amount: feeAmount, symbol: native_currency.symbol },
          tx: { type: "cosmos", val: { fee, msgs: [msg] } },
        };
      }
    }
    // terra native transaction, send or contract interaction
    else if (chain.type === "terra-native") {
      const amount = scaleToStr(token.amount);
      if (token.type === "terra-native" || token.type === "ibc") {
        const msg = new MsgSend(wallet.address, ap_wallets.terra, [
          new Coin(token.token_id, amount),
        ]);

        const fee = await estimateTerraFee(wallet, [msg]);
        const feeAmount = extractFeeAmount(fee, native_currency.token_id);

        return {
          fee: { amount: feeAmount, symbol: native_currency.symbol },
          tx: {
            type: "terra",
            val: { fee, msgs: [msg] },
            //terra-native won't appear if terra wallet is not connected
            wallet: terraWallet!,
          },
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
          tx: {
            type: "terra",
            val: { fee, msgs: [msg] },
            wallet: terraWallet!,
          },
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
        feeAmount = parseFloat(
          ethers.utils.formatUnits(minFee, token.decimals)
        );
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
        feeAmount = parseFloat(
          ethers.utils.formatUnits(minFee, token.decimals)
        );
      }

      return {
        fee: { amount: feeAmount, symbol: native_currency.symbol },
        tx: { type: "evm", val: tx },
      };
    }
  } catch (err) {
    logger.error(err);
    return null;
  }
}

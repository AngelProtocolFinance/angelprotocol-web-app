import ERC20Abi from "abi/ERC20.json";
import { EVMContract, TransactionRequest, Web3Provider } from "types/evm";
import { Coin, MsgExecuteContract, MsgSend } from "types/terra";
import { WithWallet } from "contexts/Wallet";
import { Estimate, SubmitStep } from "slices/donation";
import Account from "contracts/Account";
import CW20 from "contracts/CW20";
import { extractFeeAmount, getProvider, logger, scaleToStr } from "helpers";
import { formatUnits, parseUnits } from "helpers/evm";
import { ap_wallets } from "constants/ap_wallets";
import estimateTerraFee from "./estimateTerraFee";

export async function estimateDonation({
  details: { token, tokens },
  wallet,
}: WithWallet<SubmitStep>): Promise<Estimate | null> {
  const native = tokens[0];

  try {
    if (wallet.type === "cosmos") {
      const scaledAmount = scaleToStr(token.amount, token.decimals);
      if (token.type === "juno-native" || token.type === "ibc") {
        const contract = new Account(wallet);
        const msg = contract.createTransferNativeMsg(
          scaledAmount,
          ap_wallets.juno_deposit,
          token.token_id
        );

        const fee = await contract.estimateFee([msg]);
        const feeAmount = extractFeeAmount(fee, native.token_id);

        return {
          type: wallet.type,
          wallet,
          fee: { amount: feeAmount, symbol: native.symbol },
          tx: { fee, msgs: [msg] },
        };
      } else {
        const contract = new CW20(wallet, token.token_id);
        const msg = contract.createTransferMsg(
          scaledAmount,
          ap_wallets.juno_deposit
        );
        const fee = await contract.estimateFee([msg]);
        const feeAmount = extractFeeAmount(fee, native.token_id);

        return {
          type: wallet.type,
          wallet,
          fee: { amount: feeAmount, symbol: native.symbol },
          tx: { fee, msgs: [msg] },
        };
      }
    }
    // terra native transaction, send or contract interaction
    else if (wallet.type === "terra") {
      const scaledAmount = scaleToStr(token.amount, token.decimals);
      if (token.type === "terra-native" || token.type === "ibc") {
        const msg = new MsgSend(wallet.address, ap_wallets.terra, [
          new Coin(token.token_id, scaledAmount),
        ]);

        const fee = await estimateTerraFee(wallet, [msg]);
        const feeAmount = extractFeeAmount(fee, native.token_id);

        return {
          type: wallet.type,
          wallet,
          fee: { amount: feeAmount, symbol: native.symbol },
          tx: { fee, msgs: [msg] },
        };
      } else {
        const msg = new MsgExecuteContract(wallet.address, token.token_id, {
          transfer: {
            amount: scaledAmount,
            recipient: ap_wallets.terra,
          },
        });
        const fee = await estimateTerraFee(wallet, [msg]);
        const feeAmount = extractFeeAmount(fee, native.token_id);

        return {
          type: wallet.type,
          wallet,
          fee: { amount: feeAmount, symbol: native.symbol },
          tx: { fee, msgs: [msg] },
        };
      }
    }
    // evm transactions
    else {
      const provider = new Web3Provider(getProvider(wallet.id) as any);
      //no network request
      const signer = provider.getSigner();
      const sender = await signer.getAddress();
      const gasPrice = await signer.getGasPrice();
      const scaledAmount = parseUnits(`${token.amount}`, token.decimals);

      const tx: TransactionRequest = {
        from: sender,
        to: ap_wallets.eth,
        value: scaledAmount,
      };

      let feeAmount = 0;
      if (token.type === "evm-native") {
        const gasLimit = await signer.estimateGas(tx);
        const minFee = gasLimit.mul(gasPrice);
        feeAmount = parseFloat(formatUnits(minFee, token.decimals));
      } else {
        const ER20Contract: any = new EVMContract(
          token.token_id,
          ERC20Abi,
          signer
        );
        const gasLimit = await ER20Contract.estimateGas.transfer(
          tx.to,
          scaledAmount
        );
        const minFee = gasLimit.mul(gasPrice);
        feeAmount = parseFloat(formatUnits(minFee, token.decimals));
      }
      return {
        type: wallet.type,
        wallet,
        fee: { amount: feeAmount, symbol: native.symbol },
        tx,
      };
    }
  } catch (err) {
    logger.error(err);
    return null;
  }
}

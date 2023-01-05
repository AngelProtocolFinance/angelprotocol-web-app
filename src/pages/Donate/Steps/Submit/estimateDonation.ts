import { fromUtf8 } from "@cosmjs/encoding";
import ERC20Abi from "abi/ERC20.json";
import { EVMContract, TransactionRequest, Web3Provider } from "types/evm";
import { Coin, MsgExecuteContract, MsgSend } from "types/terra";
import { WithWallet } from "contexts/WalletContext";
import { Estimate, SubmitStep } from "slices/donation";
import Account from "contracts/Account";
import CW20 from "contracts/CW20";
import GiftCard from "contracts/GiftCard";
import { extractFeeAmount, getProvider, logger, scaleToStr } from "helpers";
import { formatUnits, parseUnits } from "helpers/evm";
import { ap_wallets } from "constants/ap_wallets";
import estimateTerraFee from "./estimateTerraFee";
import getBreakdown from "./getBreakdown";

export async function estimateDonation({
  recipient,
  details: { token, tokens, pctLiquidSplit },
  wallet,
}: WithWallet<SubmitStep>): Promise<Estimate | null> {
  const native = tokens[0];

  try {
    if (wallet.type === "cosmos") {
      const { fromBal, fromGift } = getBreakdown(token);
      const scaledAmount = scaleToStr(token.amount, token.decimals);
      const contract = new Account(wallet);
      const msgs = [];
      if (fromBal) {
        msgs.push(
          token.type === "juno-native" || token.type === "ibc"
            ? contract.createTransferNativeMsg(
                scaledAmount,
                ap_wallets.juno_deposit,
                token.token_id
              )
            : new CW20(wallet, token.token_id).createTransferMsg(
                scaledAmount,
                ap_wallets.juno_deposit
              )
        );
      }
      if (fromGift) {
        msgs.push(
          new GiftCard(wallet).createSpendMsg(
            recipient.id,
            fromGift,
            token,
            pctLiquidSplit
          )
        );
      }

      const msg: any = msgs[0];
      console.log(JSON.parse(fromUtf8(msg.value.msg)));

      const fee = await contract.estimateFee(msgs);
      const feeAmount = extractFeeAmount(fee, native.token_id);

      return {
        type: wallet.type,
        wallet,
        fee: { amount: feeAmount, symbol: native.symbol },
        tx: { fee, msgs },
      };
    }
    // terra native transaction, send or contract interaction
    else if (wallet.type === "terra") {
      const scaledAmount = scaleToStr(token.amount, token.decimals);

      const msg =
        token.type === "terra-native" || token.type === "ibc"
          ? new MsgSend(wallet.address, ap_wallets.terra, [
              new Coin(token.token_id, scaledAmount),
            ])
          : new MsgExecuteContract(wallet.address, token.token_id, {
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

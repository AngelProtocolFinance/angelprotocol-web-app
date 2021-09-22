import { useConnectedWallet } from "@terra-money/wallet-provider";
/*
  UserDenied,
  CreateTxFailed,
  TxFailed,
  Timeout,
  TxUnspecifiedError, */

import {
  CreateTxOptions,
  MsgExecuteContract,
  StdFee,
  Coin,
  Dec,
} from "@terra-money/terra.js";

interface DepositArgs {
  fund_id: number;
  split: Dec;
}

interface DepositMsg {
  deposit: DepositArgs;
}

const contractAddress = "terra174kgn5rtw4kf6f938wm7kwh70h2v4vcfd26jlc";

export default function useDonate() {
  const connectedWallet = useConnectedWallet();

  //executing message (needs gas)
  async function handleDonate() {
    if (!connectedWallet) {
      return;
    }

    const depositMessage: DepositMsg = {
      deposit: {
        fund_id: 1,
        split: new Dec(0.5),
      },
    };

    //for coins --> smart contract accepts 'uusd'
    const donateMsg = new MsgExecuteContract(
      connectedWallet.terraAddress,
      contractAddress,
      depositMessage,
      [new Coin("uusd", 100000)]
    );

    const txOptions: CreateTxOptions = {
      msgs: [donateMsg],
      fee: new StdFee(6000000, [new Coin("uusd", 3000000)]), // TODO (borodanov): adjust fee
    };

    const result = await connectedWallet.post(txOptions);
    console.log(result);
  }

  return handleDonate;
}

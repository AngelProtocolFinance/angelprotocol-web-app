import { FormikHelpers } from "formik";
import { useConnectedWallet } from "@terra-money/wallet-provider";

import {
  AccAddress,
  CreateTxOptions,
  MsgExecuteContract,
  StdFee,
  Coin,
  Dec,
  Denom,
} from "@terra-money/terra.js";

import { Values } from "./Donator";
import handleError from "./handleError";

interface DepositArgs {
  fund_id: number;
  split: undefined;
}

interface DepositMsg {
  deposit: DepositArgs;
}

//change contract address depending on the wallet network
const contractAddress: AccAddress =
  "terra19hajpu39cr9h25azwsgdaz98mc7ep774mt6bh";

export default function useDonate() {
  const connectedWallet = useConnectedWallet();

  //executing message (needs gas)
  async function handleDonate(values: Values, actions: FormikHelpers<Values>) {
    const UST_Amount = values.amount;
    const micro_UST_Amount = new Dec(UST_Amount).mul(1_000_000).toNumber();

    actions.setSubmitting(true);

    if (!connectedWallet) {
      alert("wallet is not connected");
      //set error message
      return;
    }
    const depositMessage: DepositMsg = {
      deposit: {
        fund_id: 1,
        split: undefined,
      },
    };

    //useIndexFund(network, )

    //for coins --> smart contract accepts 'uusd'
    const donateMsg = new MsgExecuteContract(
      connectedWallet.terraAddress,
      contractAddress,
      depositMessage,
      [new Coin(Denom.USD, micro_UST_Amount)]
    );

    //what is the right amout of fee??
    const fee = new StdFee(6_000_000, [new Coin(Denom.USD, 3_000_000)]);

    try {
      const transaction: CreateTxOptions = {
        msgs: [donateMsg],
        fee,
      };

      const result = await connectedWallet.post(transaction);
      console.log(result);
    } catch (error) {
      const errorObj = handleError(error);
      actions.setStatus(errorObj);
    }
  }

  return { handleDonate };
}

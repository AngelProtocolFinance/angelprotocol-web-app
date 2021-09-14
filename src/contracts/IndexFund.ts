import {
  AccAddress,
  Coin,
  CreateTxOptions,
  Dec,
  Denom,
  MsgExecuteContract,
  StdFee,
} from "@terra-money/terra.js";

export default class Indexfund {
  walletAddress: string;
  chainID: string;
  //contract address

  //create static method to get contract address based on chainId
  static contractAddress = "terra19hajpu39cr9h25azwsgdaz98mc7ejp774mt6ch";

  //may need to re-implement to handle multiple currencies in the future
  static gasLimit = 6_000_000; //unit
  static gasCoinAmount = 3_000_000; //'uust'
  static fee = new StdFee(this.gasLimit, [
    new Coin(Denom.USD, this.gasCoinAmount),
  ]);

  constructor(walletAddress: AccAddress, chainID: string) {
    this.walletAddress = walletAddress;
    this.chainID = chainID;
  }

  createDepositTransaction(
    fund_id: number,
    UST_amount: number | string,
    split?: number
  ): CreateTxOptions {
    const micro_UST_Amount = new Dec(UST_amount).mul(1_000_000).toNumber();

    const depositMessage = new MsgExecuteContract(
      this.walletAddress,
      Indexfund.contractAddress,
      {
        deposit: {
          fund_id,
          split,
        },
      },
      [new Coin(Denom.USD, micro_UST_Amount)]
    );

    return {
      msgs: [depositMessage],
      fee: Indexfund.fee,
    };
  }
}

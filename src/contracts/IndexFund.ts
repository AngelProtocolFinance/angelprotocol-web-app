import {
  AccAddress,
  Coin,
  CreateTxOptions,
  Dec,
  Denom,
  MsgExecuteContract,
  StdFee,
} from "@terra-money/terra.js";

interface ContractAddresses {
  [index: string]: string;
}

export default class Indexfund {
  walletAddress: string;
  chainID: string;
  //contract address

  //TODO: hide contract addresses to env
  static indexFundAddresses: ContractAddresses = {
    "bombay-10": "terra19hajpu39cr9h25azwsgdaz98mc7ejp774mt6ch",
    localterra: "terra174kgn5rtw4kf6f938wm7kwh70h2v4vcfd26jlc",
    "tequila-0004": "",
    "columbus-4": "",
  };

  //may need to re-implement to handle multiple currencies in the future
  static gasLimit = 6_000_000; //unit
  static gasCoinAmount = 3_000_000; //'uust'
  static fee = new StdFee(Indexfund.gasLimit, [
    new Coin(Denom.USD, Indexfund.gasCoinAmount),
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
    console.log(this.chainID);
    const micro_UST_Amount = new Dec(UST_amount).mul(1_000_000).toNumber();

    const depositMessage = new MsgExecuteContract(
      this.walletAddress,
      Indexfund.indexFundAddresses[this.chainID],
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

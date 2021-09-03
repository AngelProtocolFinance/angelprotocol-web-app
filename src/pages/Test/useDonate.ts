import {
  useConnectedWallet,
  UserDenied,
  CreateTxFailed,
  TxFailed,
  Timeout,
  TxUnspecifiedError,
} from "@terra-money/wallet-provider";

import {
  LCDClient,
  CreateTxOptions,
  MsgExecuteContract,
  StdFee,
  Coin,
  Dec,
} from "@terra-money/terra.js";

//you should use test wallet 6 since in the test suite testwallet6 is added as TCA member
// in creating new wallet in terra station
//wallet name : whatever (mine is: tca-wallet)
//walletpassword: whatever (mine is: tcawallet6)
//seed phrase (don't include the single quotes when copying)
//'spatial forest elevator battle also spoon fun skirt flight initial nasty transfer glory palm drama gossip remove fan joke shove label dune debate quick'
//source of that seedphase is here: https://github.com/terra-money/terra.js/blob/master/src/client/LocalTerra.ts

//get this when you ran test-suite

enum queries {
  tca_list = '{ "tca_list": {} }',
  state = '{"state":{}}',
  config = '{"config":{}}',
  funds_list = '{"funds_list":{}}',
  fund_details = '{"fund_details":{"fund_id":1}}',
  active_fund_details = '{"active_fund_details":{}}',
  active_fund_donations = '{"active_fund_donations":{}}',
}

interface DepositArgs {
  fund_id: number;
  split: Dec;
}

interface DepositMsg {
  deposit: DepositArgs;
}

const contractAddress = "terra174kgn5rtw4kf6f938wm7kwh70h2v4vcfd26jlc";
const message = {};

export default function useDonate() {
  const connectedWallet = useConnectedWallet();
  console.log(connectedWallet);

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

  //querying
  async function handleGetTCAList() {
    if (!connectedWallet) {
      console.log("not connected");
      return;
    }
    const terra = new LCDClient({
      URL: connectedWallet.network.lcd,
      chainID: connectedWallet.network.chainID,
    });

    const result = await terra.wasm.contractQuery(
      contractAddress,
      JSON.parse(queries.active_fund_donations)
    );

    console.log(result);
  }

  return handleDonate;
}

/**
 * const queryTx = async () => {
		if (!connectedWallet) return

        const tx = await sender.createAndSignTx({
    msgs,
    fee: new StdFee(6000000, [new Coin("uusd", 3000000)]),
  });

  const result = await terra.tx.broadcast(tx);

    const terra = new LCDClient({
      URL: connectedWallet.network.lcd,
      chainID: connectedWallet.network.chainID
    });

    const result = await terra.wasm.contractQuery(
      contracts.AngelProtocolIndexFund.address[currentNetwork],
      contracts.AngelProtocolIndexFund.queryMessages.getBalance
    );


     const execute = new MsgExecuteContract(
      connectedWallet.terraAddress,
      contracts.AngelProtocolIndexFund.address[currentNetwork],
      contracts.AngelProtocolIndexFund.handleMessages.depositDonor
    );

    const txOptions: CreateTxOptions = {
      msgs: [execute],
      fee: new StdFee(200000, { uluna: 1000000 }), // TODO (borodanov): adjust fee
    };

    try {
      const result = await connectedWallet.post(txOptions);
 */

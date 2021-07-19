import React from "react";
import logo from "./tca-logo.png";
import "./App.css";
import { ConnectTerraButton } from "./components/ConnectTerraButton";
import contracts from "./contracts";

import {
  useConnectedWallet,
  UserDenied,
  CreateTxFailed,
  TxFailed,
  Timeout,
  TxUnspecifiedError,
} from "@terra-money/wallet-provider";
import {
  CreateTxOptions,
  MsgExecuteContract,
  StdFee,
  LCDClient,
} from "@terra-money/terra.js";

function App() {
  const connectedWallet = useConnectedWallet();

  const currentNetwork = "localterra"; // TODO: should be:
  // const currentNetwork = connectedWallet.network.name

  const queryTx = async () => {
    if (!connectedWallet) return;

    const terra = new LCDClient({
      URL: connectedWallet.network.lcd,
      chainID: connectedWallet.network.chainID,
    });

    const result = await terra.wasm.contractQuery(
      contracts.AngelProtocolIndexFund.address[currentNetwork],
      contracts.AngelProtocolIndexFund.queryMessages.getBalance
    );

    console.log(result);
  };

  const postTx = async () => {
    if (!connectedWallet) return; // TODO: should be:
    // const currentNetwork = connectedWallet.network.name

    const execute = new MsgExecuteContract(
      connectedWallet.terraAddress,
      contracts.AngelProtocolIndexFund.address[currentNetwork],
      contracts.AngelProtocolIndexFund.handleMessages.depositDonor
    );

    const txOptions: CreateTxOptions = {
      msgs: [execute],
      fee: new StdFee(200000, { uluna: 1000000 }), // TODO: adjust fee
    };

    try {
      const result = await connectedWallet.post(txOptions);
      console.log(result);
    } catch (error) {
      if (error instanceof UserDenied) {
        console.log("User Denied");
      } else if (error instanceof CreateTxFailed) {
        console.log("Create Tx Failed");
        console.log(error.message);
        console.log(error.tx);
      } else if (error instanceof TxFailed) {
        console.log("Tx Failed");
        console.log(error.txhash);
        console.log(error.message);
        console.log(error.raw_message);
        console.log(error.tx);
      } else if (error instanceof Timeout) {
        console.log("Timeout");
        console.log(error.message);
      } else if (error instanceof TxUnspecifiedError) {
        console.log(error.message);
        console.log(error.tx);
      } else {
        console.log(String(error));
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ConnectTerraButton />
      </header>
      <div>
        <button
          disabled={!connectedWallet || !connectedWallet.availablePost}
          onClick={postTx}
        >
          Post Tx
        </button>
        <button
          disabled={!connectedWallet || !connectedWallet.availablePost}
          onClick={queryTx}
        >
          Query
        </button>
      </div>
    </div>
  );
}

export default App;

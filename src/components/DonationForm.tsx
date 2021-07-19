import React, { useState } from "react";
import contracts from "../contracts";

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
} from "@terra-money/terra.js";

export function DonationForm() {
  const [amountToDonate, setAmountToDonate] = useState("");
  const connectedWallet = useConnectedWallet();

  const currentNetwork = "localterra"; // TODO: should be:
  // const currentNetwork = connectedWallet.network.name

  const donate = async () => {
    if (!connectedWallet) return; // TODO (borodanov): should be:
    // const currentNetwork = connectedWallet.network.name

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
    <div>
      <h3>Donation Form</h3>
      <label>
        Amount:
        <input
          type="number"
          name="amount"
          value={amountToDonate}
          onChange={(e) => setAmountToDonate(e.target.value)}
        />
      </label>
      <button
        disabled={!connectedWallet || !connectedWallet.availablePost}
        onClick={donate}
      >
        Donate
      </button>
    </div>
  );
}

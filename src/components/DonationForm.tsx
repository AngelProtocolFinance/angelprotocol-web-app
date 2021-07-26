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

interface DonationFormProps {
  pushTransactionStatus: any;
}

export function DonationForm(props: DonationFormProps) {
  const { pushTransactionStatus } = props;

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
      pushTransactionStatus(
        `Transaction success with txhash: ${result.result.txhash}`
      );
      console.log(result);
    } catch (error) {
      if (error instanceof UserDenied) {
        pushTransactionStatus("User Denied");
      } else if (error instanceof CreateTxFailed) {
        pushTransactionStatus("Create Tx Failed");
        pushTransactionStatus(error.message);
        pushTransactionStatus(error.tx);
      } else if (error instanceof TxFailed) {
        pushTransactionStatus("Tx Failed");
        pushTransactionStatus(error.txhash);
        pushTransactionStatus(error.message);
        pushTransactionStatus(error.raw_message);
        pushTransactionStatus(error.tx);
      } else if (error instanceof Timeout) {
        pushTransactionStatus("Timeout");
        pushTransactionStatus(error.message);
      } else if (error instanceof TxUnspecifiedError) {
        pushTransactionStatus(error.message);
        pushTransactionStatus(error.tx);
      } else {
        pushTransactionStatus(String(error));
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

import React, { useEffect, useState } from "react";

import contracts from "../contracts";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { LCDClient } from "@terra-money/terra.js";

export function CurrentBalance() {
  const [balanceUST, setBalanceUST] = useState();
  const connectedWallet = useConnectedWallet();

  const currentNetwork = "localterra"; // TODO: should be:
  // const currentNetwork = connectedWallet.network.name

  const queryBalanceUST = async () => {
    if (!connectedWallet) return;

    const terra = new LCDClient({
      URL: connectedWallet.network.lcd,
      chainID: connectedWallet.network.chainID,
    });

    // TODO (borodanov): remove any type
    // TODO (borodanov): handle exceptions
    const result: any = await terra.wasm.contractQuery(
      contracts.AngelProtocolIndexFund.address[currentNetwork],
      contracts.AngelProtocolIndexFund.queryMessages.getBalance
    );

    if (result) {
      // TODO (borodanov): result.count is only for testing purposes
      // it should be something like this: result.balanceUST
      setBalanceUST(result.count);
    }
  };

  // load balance on component did mount
  useEffect(() => {
    queryBalanceUST();
  });

  return (
    <div>
      <h3>Current balance</h3>
      <div>UST: {balanceUST}</div>
      {/* TODO (borodanov): remove button for updating, make updating by timer */}
      <button
        disabled={!connectedWallet || !connectedWallet.availablePost}
        onClick={queryBalanceUST}
      >
        Update balance
      </button>
    </div>
  );
}

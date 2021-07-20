import React, { useState } from "react";
import logo from "./tca-logo.png";
import "./App.css";

import { ConnectTerraButton } from "./components/ConnectTerraButton";
import { DonationForm } from "./components/DonationForm";
import { CurrentBalance } from "./components/CurrentBalance";
import { TransactionsStatuses } from "./components/TransactionsStatuses";

function App() {
  // TODO (borodanov): remove 'any', create type for transactionStatus
  const [transactionsStatuses, setTransactionsStatuses] = useState<any[]>([]);

  // TODO (borodanov): remove 'any'
  const pushTransactionStatus = (status: any) => {
    setTransactionsStatuses([...transactionsStatuses, status]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ConnectTerraButton />
      </header>
      <div>
        <TransactionsStatuses transactionsStatuses={transactionsStatuses} />
        <CurrentBalance />
        <DonationForm pushTransactionStatus={pushTransactionStatus} />
      </div>
    </div>
  );
}

export default App;

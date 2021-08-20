import React, { useState } from "react";
import logo from "./tca-logo.png";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "pages/Dashboard";
import Charity from "pages/Charity";
import { ConnectTerraButton } from "./components/ConnectTerraButton";
import { DonationForm } from "./components/DonationForm";
import { CurrentBalance } from "./components/CurrentBalance";
import { TransactionsStatuses } from "./components/TransactionsStatuses";

const ExampleApp = () => {
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
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ExampleApp} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/charity/:title" component={Charity} />
      </Switch>
    </Router>
  );
};

export default App;

import React from "react";
import logo from "./tca-logo.png";
import "./App.css";

import { ConnectTerraButton } from "./components/ConnectTerraButton";
import { DonationForm } from "./components/DonationForm";
import { CurrentBalance } from "./components/CurrentBalance";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ConnectTerraButton />
      </header>
      <div>
        <CurrentBalance />
        <DonationForm />
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import logo from './tca-logo.png';
import './App.css';
import { ConnectTerraButton } from './components/ConnectTerraButton';

import { useWallet } from '@terra-money/wallet-provider';

function App() {
  const { status, network, wallets } = useWallet();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ConnectTerraButton />
      </header>
      <div>
        <section>
          <pre>
            {JSON.stringify(status)}
          </pre>
          <pre>
            {JSON.stringify(network)}
          </pre>
          <pre>
            {JSON.stringify(wallets)}
          </pre>
        </section>
      </div>
    </div>
  );
}

export default App;

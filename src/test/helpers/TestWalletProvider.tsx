import React, { ReactNode } from "react";
import {
  NetworkInfo,
  StaticWalletProvider,
  WalletInfo,
  WalletStatus,
} from "@terra-money/wallet-provider";

const testnet: NetworkInfo = {
  name: "testnet",
  chainID: "tequila-0004",
  lcd: "https://tequila-lcd.terra.dev",
};

const TestWalletProvider: React.FC<{
  children?: ReactNode;
  walletStatus?: WalletStatus;
  walletInfo?: WalletInfo;
}> = ({ children, walletStatus, walletInfo }) => {
  const status = walletStatus ?? WalletStatus.WALLET_NOT_CONNECTED;
  const wallets = (walletInfo && [walletInfo]) ?? [];

  return (
    <StaticWalletProvider
      defaultNetwork={testnet}
      status={status}
      wallets={wallets}
    >
      {children}
    </StaticWalletProvider>
  );
};

export default TestWalletProvider;

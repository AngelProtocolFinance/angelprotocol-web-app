import { FC, ReactNode } from "react";
import {
  ConnectType,
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
// NOTE(davidlumley): Via https://github.com/terra-money/wallet-provider/issues/6
//                    TestWalletProvider takes two optional args: walletStatus, and walletInfo
//                    which can be used to set the state.
// NOTE(borodanov): also for now this component is using in the storybook stories
const TestWalletProvider: FC<{
  children?: ReactNode;
  walletStatus?: WalletStatus;
  walletInfo?: WalletInfo;
  availableConnectTypes?: ConnectType[];
  availableInstallTypes?: ConnectType[];
}> = ({
  children,
  walletStatus,
  walletInfo,
  availableConnectTypes,
  availableInstallTypes,
}) => {
  const status = walletStatus ?? WalletStatus.WALLET_NOT_CONNECTED;
  const wallets = (walletInfo && [walletInfo]) ?? [];
  const _availableConnectTypes = availableConnectTypes ?? [
    ConnectType.CHROME_EXTENSION,
  ];
  const _availableInstallTypes = availableInstallTypes ?? [
    ConnectType.CHROME_EXTENSION,
  ];

  return (
    <StaticWalletProvider
      defaultNetwork={testnet}
      status={status}
      wallets={wallets}
      availableConnectTypes={_availableConnectTypes}
      availableInstallTypes={_availableInstallTypes}
    >
      {children}
    </StaticWalletProvider>
  );
};

export default TestWalletProvider;

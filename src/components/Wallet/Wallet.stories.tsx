import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  ConnectType,
  NetworkInfo,
  StaticWalletProvider,
  WalletStatus,
} from "@terra-money/wallet-provider";
import Wallet from "./Wallet";

const testnet: NetworkInfo = {
  name: "testnet",
  chainID: "tequila-0004",
  lcd: "https://tequila-lcd.terra.dev",
};

export default {
  title: "Components/Wallet",
  component: Wallet,
} as ComponentMeta<typeof Wallet>;

const Template: ComponentStory<typeof Wallet> = (args) => {
  return (
    <StaticWalletProvider defaultNetwork={testnet} {...args}>
      <div
        style={{
          background: "black",
          width: "20em",
          height: "20rem",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Wallet />
      </div>
    </StaticWalletProvider>
  );
};

export const Initializing = Template.bind({});
Initializing.args = {};

export const NotConnected = Template.bind({});
NotConnected.args = {
  status: WalletStatus.WALLET_NOT_CONNECTED,
  availableConnectTypes: [ConnectType.CHROME_EXTENSION],
};

export const Connected = Template.bind({});
Connected.args = {
  status: WalletStatus.WALLET_CONNECTED,
  availableConnectTypes: [ConnectType.CHROME_EXTENSION],
};

export const NeedsInstall = Template.bind({});
NeedsInstall.args = {
  status: WalletStatus.WALLET_NOT_CONNECTED,
  availableInstallTypes: [ConnectType.CHROME_EXTENSION],
};

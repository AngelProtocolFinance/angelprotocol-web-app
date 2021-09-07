import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  ConnectType,
  NetworkInfo,
  StaticWalletProvider,
  WalletStatus,
} from "@terra-money/wallet-provider";
import TerraConnector from "./TerraConnector";

const testnet: NetworkInfo = {
  name: "testnet",
  chainID: "tequila-0004",
  lcd: "https://tequila-lcd.terra.dev",
};
export default {
  title: "Components/Terra Connector",
  component: TerraConnector,
} as ComponentMeta<typeof TerraConnector>;

const Template: ComponentStory<typeof TerraConnector> = (args) => {
  return (
    <StaticWalletProvider defaultNetwork={testnet} {...args}>
      <TerraConnector />
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
  wallets: [
    {
      connectType: ConnectType.CHROME_EXTENSION,
      terraAddress: "terra1235",
    },
  ],
};

export const NeedsInstall = Template.bind({});
NeedsInstall.args = {
  status: WalletStatus.WALLET_NOT_CONNECTED,
  availableInstallTypes: [ConnectType.CHROME_EXTENSION],
};

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
      <div style={{ background: "black", width: "20rem", display: "flex" }}>
        <Wallet />
      </div>
    </StaticWalletProvider>
  );
};

export const Connected = Template.bind({});
Connected.args = {
  status: WalletStatus.WALLET_CONNECTED,
  availableConnectTypes: [ConnectType.CHROME_EXTENSION],
  wallets: [
    {
      connectType: ConnectType.CHROME_EXTENSION,
      terraAddress: "terra1235",
    },
  ],
};

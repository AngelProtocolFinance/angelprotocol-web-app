import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  ConnectType,
  NetworkInfo,
  StaticWalletProvider,
  WalletStatus,
} from "@terra-money/wallet-provider";

import { MemoryRouter } from "react-router-dom";
import Header from ".";

const testnet: NetworkInfo = {
  name: "testnet",
  chainID: "tequila-0004",
  lcd: "https://tequila-lcd.terra.dev",
};

export default {
  title: "Layout/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => {
  return (
    <MemoryRouter>
      <StaticWalletProvider defaultNetwork={testnet}>
        <Header />;
      </StaticWalletProvider>
    </MemoryRouter>
  );
};

export const Default = Template.bind({});

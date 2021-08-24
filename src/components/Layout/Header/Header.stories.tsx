import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  NetworkInfo,
  StaticWalletProvider,
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

const Template: ComponentStory<typeof Header> = (args) => {
  return (
    <StaticWalletProvider defaultNetwork={testnet}>
      <MemoryRouter>
        <Header {...args} />;
      </MemoryRouter>
    </StaticWalletProvider>
  );
};

export const NavMenu = Template.bind({});
NavMenu.args = { hasMenu: true };

export const NoMenu = Template.bind({});
NoMenu.args = { hasMenu: false };

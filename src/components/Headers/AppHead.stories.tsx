import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  NetworkInfo,
  StaticWalletProvider,
} from "@terra-money/wallet-provider";
import { MemoryRouter } from "react-router";
import AppHead from "./AppHead";

const testnet: NetworkInfo = {
  name: "testnet",
  chainID: "tequila-0004",
  lcd: "https://tequila-lcd.terra.dev",
};

export default {
  title: "Components/AppHead",
  component: AppHead,
} as ComponentMeta<typeof AppHead>;

const Template: ComponentStory<typeof AppHead> = (args) => (
  <MemoryRouter>
    <StaticWalletProvider defaultNetwork={testnet} {...args}>
      <div style={{ background: "black", width: "20rem", display: "flex" }}>
        <AppHead />
      </div>
    </StaticWalletProvider>
  </MemoryRouter>
);
export const Default = Template.bind({});

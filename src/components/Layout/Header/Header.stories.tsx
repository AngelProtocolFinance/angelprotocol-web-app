import { ComponentStory, ComponentMeta } from "@storybook/react";
import { WalletStatus } from "@terra-money/wallet-provider";
import TestWalletProvider from "test/helpers/TestWalletProvider";

import Header from ".";

export default {
  title: "Layout/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => {
  return (
    // TODO (borodanov to cheng): need create stories for header with different wallet states.
    // for now it only works for WALLET_NOT_CONNECTED
    // so possibly TestWalletProvider is not the best idea to use it here.
    // possibly better to use TestWalletProvider in the ConnectedWallet.args
    // but it's a question how to make it more nicely
    // https://storybook.js.org/docs/react/workflows/build-pages-with-storybook
    <TestWalletProvider walletStatus={WalletStatus.WALLET_NOT_CONNECTED}>
      <Header {...args} />
    </TestWalletProvider>
  );
};

export const ConnectedWallet = Template.bind({});
ConnectedWallet.args = {
  wallet: { terraAddress: "123" },
  onConnect: () => {},
  onDisconnect: () => {},
};

export const DisconnectedWallet = Template.bind({});
DisconnectedWallet.args = {
  onConnect: () => {},
  onDisconnect: () => {},
};

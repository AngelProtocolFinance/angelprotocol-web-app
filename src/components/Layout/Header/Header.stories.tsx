import { ComponentStory, ComponentMeta } from "@storybook/react";

import Header from ".";

export default {
  title: "Layout/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

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

import { ComponentStory, ComponentMeta } from "@storybook/react";
import Header from ".";

export default {
  title: "Layout/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => {
  return <Header />;
};

export const Default = Template.bind({});

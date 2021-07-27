import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Header from "./Header";

export default {
  title: "Layout/Header",
  component: Header,
  argTypes: {},
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Standard = Template.bind({});
Standard.args = {};

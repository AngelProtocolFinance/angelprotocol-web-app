import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Footer from "./Footer";

export default {
  title: "Layout/Footer",
  component: Footer,
  argTypes: {},
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Standard = Template.bind({});
Standard.args = {};

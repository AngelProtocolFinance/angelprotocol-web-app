import { ComponentStory, ComponentMeta } from "@storybook/react";

import NavMenu from ".";

export default {
  title: "Layout/NavManu",
  component: NavMenu,
  argTypes: {},
} as ComponentMeta<typeof NavMenu>;

const Template: ComponentStory<typeof NavMenu> = () => <NavMenu />;

export const Default = Template.bind({});
Default.args = {};

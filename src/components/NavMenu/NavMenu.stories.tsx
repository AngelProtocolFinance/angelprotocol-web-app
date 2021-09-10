import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import NavMenu from "./NavMenu";

export default {
  title: "Layout/NavMenu",
  component: NavMenu,
  argTypes: {},
} as ComponentMeta<typeof NavMenu>;

const Template: ComponentStory<typeof NavMenu> = () => (
  <MemoryRouter>
    <NavMenu />
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {};

import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import WebMenu from "./WebMenu";

export default {
  title: "Layout/WebMenu",
  component: WebMenu,
  argTypes: {},
} as ComponentMeta<typeof WebMenu>;

const Template: ComponentStory<typeof WebMenu> = () => (
  <MemoryRouter>
    <WebMenu />
  </MemoryRouter>
);
export const Default = Template.bind({});
Default.args = {};

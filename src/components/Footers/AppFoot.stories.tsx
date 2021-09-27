import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter } from "react-router";
import AppFoot from "./AppFoot";

export default {
  title: "Components/AppFoot",
  component: AppFoot,
} as ComponentMeta<typeof AppFoot>;

const Template: ComponentStory<typeof AppFoot> = () => (
  <MemoryRouter>
    <AppFoot />
  </MemoryRouter>
);
export const Default = Template.bind({});

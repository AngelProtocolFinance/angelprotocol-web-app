import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import WebHead from "./WebHead";

export default {
  title: "Components/WebHead",
  component: WebHead,
} as ComponentMeta<typeof WebHead>;

const Template: ComponentStory<typeof WebHead> = () => (
  <MemoryRouter>
    <WebHead />
  </MemoryRouter>
);

export const Default = Template.bind({});

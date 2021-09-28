import { ComponentStory, ComponentMeta } from "@storybook/react";
import WebFoot from "./WebFoot";

export default {
  title: "Components/WebFoot",
  component: WebFoot,
} as ComponentMeta<typeof WebFoot>;

const Template: ComponentStory<typeof WebFoot> = () => <WebFoot />;
export const Default = Template.bind({});

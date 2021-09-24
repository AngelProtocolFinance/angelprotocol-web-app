import { ComponentStory, ComponentMeta } from "@storybook/react";
import MarketFoot from "./MarketFoot";

export default {
  title: "Layout/Footer",
  component: MarketFoot,
} as ComponentMeta<typeof MarketFoot>;

const Template: ComponentStory<typeof MarketFoot> = () => <MarketFoot />;

export const Default = Template.bind({});

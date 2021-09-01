import { ComponentStory, ComponentMeta } from "@storybook/react";

import Footer from ".";

export default {
  title: "Layout/Footer",
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = () => <Footer />;

export const Default = Template.bind({});

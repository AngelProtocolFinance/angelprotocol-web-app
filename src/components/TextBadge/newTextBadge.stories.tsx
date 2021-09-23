import { ComponentStory, ComponentMeta } from "@storybook/react";

import NewTextBadge from "./newTextBadge";

export default {
  title: "Components/TextBadge",
  component: NewTextBadge,
} as ComponentMeta<typeof NewTextBadge>;

const Template: ComponentStory<typeof NewTextBadge> = () => <NewTextBadge />;

export const Default = Template.bind({});

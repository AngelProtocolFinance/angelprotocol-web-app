import { ComponentStory, ComponentMeta } from "@storybook/react";

import TextBadgeNew from "./TextBadgeNew";

export default {
  title: "Components/TextBadge",
  component: TextBadgeNew,
} as ComponentMeta<typeof TextBadgeNew>;

const Template: ComponentStory<typeof TextBadgeNew> = () => <TextBadgeNew />;

export const Default = Template.bind({});

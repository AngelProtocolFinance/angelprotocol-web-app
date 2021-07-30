import { ComponentStory, ComponentMeta } from "@storybook/react";

import CharityCard from ".";

const fixtureData = require("./CharityCard.fixture.json");

export default {
  title: "Components/CharityCard",
  component: CharityCard,
  argTypes: {
    title: {
      control: "string",
    },
    description: {
      control: "string",
    },
  },
} as ComponentMeta<typeof CharityCard>;

const Template: ComponentStory<typeof CharityCard> = (args) => (
  <CharityCard {...args} />
);

export const Default = Template.bind({});
Default.args = fixtureData;

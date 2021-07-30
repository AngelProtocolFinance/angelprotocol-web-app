import { ComponentStory, ComponentMeta } from "@storybook/react";

import CharityCategory from ".";

const fixtureData = require("./CharityCategory.fixture.json");

export default {
  title: "Components/CharityCategory",
  component: CharityCategory,
  argTypes: {
    title: {
      control: "string",
    },
    description: {
      control: "string",
    },
  },
} as ComponentMeta<typeof CharityCategory>;

const Template: ComponentStory<typeof CharityCategory> = (args) => (
  <div className="container mx-auto flex-auto px-4">
    <CharityCategory {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = fixtureData;

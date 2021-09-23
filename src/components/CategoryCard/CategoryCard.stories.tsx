import { ComponentStory, ComponentMeta } from "@storybook/react";
import CategoryCard from "./CategoryCard";

export default {
  title: "Components/Category Card",
  component: CategoryCard,
} as ComponentMeta<typeof CategoryCard>;

const Template: ComponentStory<typeof CategoryCard> = (args) => (
  <CategoryCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  title: "No poverty",
  description: "End poverty in all forms everywhere.",
};

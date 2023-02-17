import { Tab } from "@headlessui/react";
import { Children, ReactElement } from "react";
import { AccountType } from "types/contracts";

const types: AccountType[] = ["liquid", "locked"];
export default function AccountTabs(props: {
  classes?: {
    container?: string;
    tabs?: string;
    tab?: string;
    panels?: string;
  };
  children: [
    //limit to only 2 childs
    ReactElement<{ type: AccountType }>,
    ReactElement<{ type: AccountType }>
  ];
}) {
  return (
    <Tab.Group as="div" className={props.classes?.container}>
      <Tab.List className={props.classes?.tabs}>
        {types.map((t) => (
          <Tab key={t} className={props.classes?.tab}>
            {t}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className={props.classes?.panels}>
        {Children.map(props.children, (child) => {
          return <Tab.Panel key={child.props.type}>{child}</Tab.Panel>;
        })}
      </Tab.Panels>
    </Tab.Group>
  );
}

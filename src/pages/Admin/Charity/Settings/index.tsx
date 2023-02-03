import { Tab } from "@headlessui/react";
import React, { ReactElement } from "react";
import { AccountType } from "types/contracts";

export default function Settings() {
  return (
    <div>
      <h2 className="text-[2rem] font-bold">Settings</h2>
      <div>
        <h3>Auto-invest</h3>
        {/** future: create plan */}
      </div>
      <AccountTabs
        classes={{
          tabs: "rounded-full border border-prim grid grid-cols-2 p-1",
          tab: "uppercase text-center aria-selected:btn-outline-filled aria-selected:rounded-full aria-selected:py-1",
        }}
      >
        <Account type="liquid" />
        <Account type="locked" />
      </AccountTabs>
    </div>
  );
}

function Account(props: { type: AccountType; hello?: string }) {
  return <>{props.type}</>;
}

const types: AccountType[] = ["liquid", "locked"];
function AccountTabs(props: {
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
      <Tab.Panels>
        {React.Children.map(props.children, (child) => {
          return (
            <Tab.Panel key={child.props.type} as={React.Fragment}>
              {child}
            </Tab.Panel>
          );
        })}
      </Tab.Panels>
    </Tab.Group>
  );
}

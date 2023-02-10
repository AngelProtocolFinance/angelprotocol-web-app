import { Tab } from "@headlessui/react";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { AccountType } from "types/contracts";
import { settings } from "../routes";

export default function Settings() {
  return (
    <div>
      <h2 className="text-[2rem] font-bold mb-8">Settings</h2>
      <div className="rounded border border-prim p-6">
        <h3 className="font-bold text-2xl mb-10">Auto-invest</h3>
        {/** future: create plan */}
        <AccountTabs
          classes={{
            tabs: "rounded-full border border-prim grid grid-cols-2 p-1 gap-2 mb-9",
            tab: "font-bold uppercase text-center aria-selected:btn-outline-filled aria-selected:rounded-full aria-selected:py-1 focus:ring-transparent",
          }}
        >
          <Strategy type="liquid" />
          <Strategy type="locked" />
        </AccountTabs>
      </div>
    </div>
  );
}

function Strategy({ type }: { type: AccountType }) {
  return (
    <div className="flex py-7 px-6 items-center border border-prim rounded justify-between">
      <h4 className="text-xl font-bold">Default {type} strategy</h4>
      <Link
        to={`${settings.edit}/${type}`}
        className="btn-outline-filled px-8 py-2"
      >
        Edit
      </Link>
    </div>
  );
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
      <Tab.Panels className={props.classes?.panels}>
        {React.Children.map(props.children, (child) => {
          return <Tab.Panel key={child.props.type}>{child}</Tab.Panel>;
        })}
      </Tab.Panels>
    </Tab.Group>
  );
}

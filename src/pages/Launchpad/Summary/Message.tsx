import { PropsWithChildren, useState } from "react";
import { Completed } from "slices/launchpad/types";
import Copier from "components/Copier";
import ExtLink from "components/ExtLink";
import { DrawerIcon } from "components/Icon";
import toEVMAST from "./toEVMAST";

export default function Message(props: Completed) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);
  const codeStr = JSON.stringify(toEVMAST(props, "<msg sender>"), null, 2);

  return (
    <div className="py-4 border-t border-gray-l3 dark:border-bluegray text-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-base font-sans">Message</h3>
        <button type="button" onClick={toggle}>
          <DrawerIcon isOpen={open} className="text-2xl" />
        </button>
      </div>
      {open && (
        <>
          <p className="text-sm text-gray-d1 dark:text-gray my-4">
            Use this message to instantiate ASTs configured like such from your
            app. Don't forget to update the <Mono>address</Mono> field to
            addresses provided by your users, or create a message right after
            this one to change the <Mono>address</Mono> field. You can find more
            information{" "}
            <ExtLink
              href="https://docs.angelprotocol.io/technical/basics/creating-an-ast.html"
              className="text-white hover:text-orange-l1 transition ease-in-out duration-300"
            >
              here
            </ExtLink>
            .
          </p>
          <div className="relative grid rounded text-gray-d1 dark:text-gray border border-gray-l3 dark:border-bluegray bg-orange-l6 dark:bg-blue-d7 p-3 mb-6 text-sm">
            <Copier
              classes="absolute top-4 right-4"
              text={codeStr}
              size={{ copy: 20, check: 20 }}
            />
            <code className="font-mono whitespace-pre overflow-x-auto">
              {codeStr}
            </code>
          </div>
        </>
      )}
    </div>
  );
}

function Mono(props: PropsWithChildren) {
  return (
    <span className="font-mono bg-orange-l5 dark:bg-blue-d4 dark:text-gray-l2 text-xs font-semibold">
      {props.children}
    </span>
  );
}

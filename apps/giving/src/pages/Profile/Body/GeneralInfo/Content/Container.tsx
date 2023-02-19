import Icon from "@ap/components/icon";
import { PropsWithChildren, useState } from "react";

type Props = PropsWithChildren<{
  title: string;
}>;

export default function Container(props: Props) {
  const [isOpen, setOpen] = useState(true);

  return (
    <div className="flex flex-col gap-px w-full border border-prim rounded dark:bg-blue-d6 ">
      <Header
        isOpen={isOpen}
        title={props.title}
        onClick={() => setOpen((prev) => !prev)}
      />

      {isOpen && props.children}
    </div>
  );
}

function Header(props: {
  isOpen: boolean;
  title: string;
  onClick: () => void;
}) {
  return (
    <div
      className={`flex items-center justify-between px-8 py-5 w-full bg-orange-l5 border-prim rounded dark:bg-blue-d7 ${
        props.isOpen ? "border-b" : ""
      }`}
    >
      <span className="font-heading font-bold text-xl">{props.title}</span>
      <button
        onClick={props.onClick}
        className="flex items-center justify-center p-px w-10 h-10 border border-prim rounded"
        aria-label="toggle section content's visibility"
      >
        <Icon type={props.isOpen ? "Dash" : "Plus"} />
      </button>
    </div>
  );
}

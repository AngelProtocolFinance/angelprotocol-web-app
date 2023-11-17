import React, { PropsWithChildren, useState } from "react";
import Icon from "components/Icon";

type Props = PropsWithChildren<{
  title: string;
  classes?: string;
}>;

export default function Container({ title, children, classes = "" }: Props) {
  const [isOpen, setOpen] = useState(true);

  return (
    <div
      className={`flex flex-col gap-px w-full border border-prim rounded dark:bg-blue-d6 ${classes}`}
    >
      <Header
        isOpen={isOpen}
        title={title}
        onClick={() => setOpen((prev) => !prev)}
      />
      {isOpen && children}
    </div>
  );
}

type HeaderProps = {
  isOpen: boolean;
  onClick(): void;
  classes?: string;
  title: string;
  children?: React.ReactNode;
};

function Header(props: HeaderProps) {
  return (
    <div className={props.isOpen ? "border-b" : ""} title={props.title}>
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

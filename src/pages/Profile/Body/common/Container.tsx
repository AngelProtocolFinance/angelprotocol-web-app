import Icon from "components/Icon";
import React, { PropsWithChildren, useState } from "react";

type Props = PropsWithChildren<{
  title: string;
  expanded?: true;
  classes?: string;
}>;

export default function Container({
  expanded,
  title,
  children,
  classes = "",
}: Props) {
  const [isOpen, setOpen] = useState(true);

  return (
    <div
      className={`flex flex-col gap-px w-full border border-gray-l4 rounded dark:bg-blue-d6 ${classes}`}
    >
      {expanded ? (
        <StaticHeader title={title} />
      ) : (
        <Header
          isOpen={isOpen}
          title={title}
          onClick={() => setOpen((prev) => !prev)}
        />
      )}
      {isOpen && children}
    </div>
  );
}

type HeaderProps = {
  classes?: string;
  title: string;
  children?: React.ReactNode;
};

function StaticHeader({ title, classes = "", children }: HeaderProps) {
  return (
    <div
      className={`flex items-center justify-between px-8 py-5 w-full bg-blue-l4 border-gray-l4 rounded dark:bg-blue-d7 ${classes}`}
    >
      <span className="font-heading font-bold text-xl">{title}</span>
      {children}
    </div>
  );
}

function Header(props: {
  title: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <StaticHeader classes={props.isOpen ? "border-b" : ""} title={props.title}>
      <button
        onClick={props.onClick}
        className="flex items-center justify-center p-px w-10 h-10 border border-gray-l4 rounded"
        aria-label="toggle section content's visibility"
      >
        <Icon type={props.isOpen ? "Dash" : "Plus"} />
      </button>
    </StaticHeader>
  );
}

import { PropsWithChildren, useState } from "react";
import Icon from "components/Icon";

type Props = PropsWithChildren<{
  title: string;
}>;

export default function Container(props: Props) {
  const [isOpen, setOpen] = useState(true);

  return (
    <div className="flex flex-col gap-px w-full border border-gray-l2 rounded">
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
    <div className="flex items-center justify-between px-8 py-5 w-full bg-orange-l5 border-b border-gray-l2 rounded">
      <span className="font-heading font-bold text-xl">{props.title}</span>
      <button
        onClick={props.onClick}
        className="flex items-center justify-center p-px w-10 h-10 border border-gray-l2 rounded"
      >
        <Icon type={props.isOpen ? "Dash" : "Plus"} />
      </button>
    </div>
  );
}

import { ReactNode } from "react";

type Props = {
  total: ReactNode;
  locked: ReactNode;
  liquid: ReactNode;
  classes?: string;
};

export default function SplitSummary(props: Props) {
  return (
    <dl
      className={`text-gray-d1 py-3 gap-y-2 grid grid-cols-[1fr_auto] justify-between border-y border-prim ${
        props.classes ?? ""
      }`}
    >
      <dt className="mr-auto">Total donation</dt>
      {props.total}
      <div className="flex items-center justify-between col-span-full">
        <dt className="mr-auto text-sm">Sustainable Fund</dt>
        {props.locked}
      </div>
      <div className="flex items-center justify-between col-span-full">
        <dt className="mr-auto text-sm">Instantly Available</dt>
        {props.liquid}
      </div>
    </dl>
  );
}

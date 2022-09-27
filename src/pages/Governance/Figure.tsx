import { humanize } from "helpers";

type Props = {
  title: string;
  value: number;
  symbol: string | undefined;
  percent?: number;
  position?: string;
  precision?: number;
};

export default function Figure(props: Props) {
  return (
    <div
      className={`bg-white/10 shadow-inner text-gray-d2 w-full rounded-md p-6 ${
        props.position || ""
      }`}
    >
      <p className="font-heading font-bold mb-1 uppercase text-white">
        {props.title}
      </p>
      <p className="text-4xl font-heading text-white/80">
        <span>{humanize(props.value, props.precision || 2, true)}</span>
        <span> {props.symbol}</span>
        {/* {(props.percent && (
          <span className="text-lg pl-2 font-body">
            ( {humanize(props.percent)}% )
          </span>
        )) ||
          null} */}
      </p>
    </div>
  );
}

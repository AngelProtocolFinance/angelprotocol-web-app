import toCurrency from "helpers/toCurrency";

type Props = {
  title: string;
  value: number;
  symbol: string;
  percent?: number;
  position?: string;
  precision?: number;
};

export default function Figure(props: Props) {
  return (
    <div
      className={`bg-white/10 shadow-inner text-angel-grey w-full rounded-md p-6 ${
        props.position || ""
      }`}
    >
      <p className="font-heading font-bold mb-1 uppercase text-white-grey">
        {props.title}
      </p>
      <p className="text-4xl font-heading text-white-grey/80">
        <span className="">
          {toCurrency(props.value, props.precision || 2, true)}
        </span>
        <span className=""> {props.symbol}</span>
        {/* {(props.percent && (
          <span className="text-lg pl-2 font-body">
            ( {toCurrency(props.percent)}% )
          </span>
        )) ||
          null} */}
      </p>
    </div>
  );
}

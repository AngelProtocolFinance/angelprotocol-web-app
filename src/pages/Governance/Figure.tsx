import toCurrency from "helpers/toCurrency";

type Props = {
  title: string;
  value: number;
  denom: string;
  percent?: number;
  position?: string;
};
export default function Figure(props: Props) {
  return (
    <div
      className={`border border-opacity-10 bg-white bg-opacity-10 shadow-xl text-angel-grey w-full rounded-md p-6 ${
        props.position || ""
      }`}
    >
      <p className="font-heading font-bold mb-1 uppercase text-white-grey">
        {props.title}
      </p>
      <p className="text-4xl font-heading text-white-grey text-opacity-80">
        <span className="">{toCurrency(props.value)}</span>
        <span className=""> {props.denom}</span>
        {(props.percent && (
          <span className="text-lg pl-2 font-body">
            ( {toCurrency(props.percent)}% )
          </span>
        )) ||
          null}
      </p>
    </div>
  );
}

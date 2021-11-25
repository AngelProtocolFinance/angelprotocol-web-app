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
      className={`bg-gov-card-2 border-r border-b border-opacity-70 shadow-xl text-angel-grey w-full rounded-md p-6 ${
        props.position || ""
      }`}
    >
      <p className="font-heading font-bold mb-1 uppercase">{props.title}</p>
      <p className="text-4xl font-heading">
        <span className="">{props.value}</span>
        <span className=""> {props.denom}</span>
        {props.percent && (
          <span className="text-lg pl-2 font-body">( {props.percent}% )</span>
        )}
      </p>
    </div>
  );
}

import { humanize } from "helpers";

type Props = {
  val: number;
  symbol: string;
  classes?: string;
};
export default function Amount({ classes = "", val, symbol }: Props) {
  return (
    <div className={`flex items-baseline gap-1 ${classes}`}>
      <span>{humanize(val, 4)} </span>
      <span className="text-xs font-mono">{symbol}</span>
    </div>
  );
}

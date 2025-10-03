import { to_usd } from "helpers/to-usd";

interface Props {
  children: number;
  parens?: true;
  sign?: true;
  relative?: number;
  classes?: string;
}
export function Usd({
  classes = "",
  parens,
  relative = 0,
  sign,
  children: num,
}: Props) {
  const is_plus = num !== relative && num > relative;
  const is_minus = num !== relative && num < relative;

  if (parens && num === 0) return null;

  return (
    <span
      className={`${is_minus ? "text-red" : is_plus ? "text-green" : ""} ${classes}`}
    >
      {parens && "("}
      {is_plus && sign ? "+" : ""}
      {to_usd(num)}
      {parens && ")"}
    </span>
  );
}

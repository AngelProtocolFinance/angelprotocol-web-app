import { toUsd } from "helpers/to-usd";
import { T } from "./components";

interface Props {
  children: number;
  parens?: true;
  sign?: true;
  relative?: number;
  classes?: string;
}
export function Usd({ parens, relative = 0, sign, children: num }: Props) {
  const is_plus = num !== relative && num > relative;
  const is_minus = num !== relative && num < relative;

  if (parens && num === 0) return null;

  return (
    <T
      style={{
        fontSize: 10,
        color: is_minus ? "#ef4444" : is_plus ? "#10b981" : undefined,
      }}
    >
      {parens && "("}
      {is_plus && sign ? "+" : ""}
      {toUsd(num)}
      {parens && ")"}
    </T>
  );
}

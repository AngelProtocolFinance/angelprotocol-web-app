import { to_usd } from "helpers/to-usd";
import { T } from "./components";
import { fs } from "./styles";

interface Props {
  children: number;
  parens?: true;
  sign?: true;
  relative?: number;
}
export function Usd({ parens, relative = 0, sign, children: num }: Props) {
  const is_plus = num !== relative && num > relative;
  const is_minus = num !== relative && num < relative;

  if (parens && num === 0) return null;

  return (
    <T
      style={{
        fontSize: fs.base,
        color: is_minus ? "#ef4444" : is_plus ? "#10b981" : undefined,
      }}
    >
      {parens && "("}
      {is_plus && sign ? "+" : ""}
      {to_usd(num)}
      {parens && ")"}
    </T>
  );
}

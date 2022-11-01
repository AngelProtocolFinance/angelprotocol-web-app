import { LinkProps } from "react-router-dom";

type Btn = {
  as: "btn";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
type Lnk = { as: "link" } & LinkProps;
export type BtnProps = Btn | Lnk;

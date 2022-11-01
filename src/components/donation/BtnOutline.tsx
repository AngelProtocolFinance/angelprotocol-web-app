import React from "react";
import { Link } from "react-router-dom";
import { LinkProps } from "react-router-dom";

type Btn = {
  as: "btn";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
type Lnk = { as: "link" } & LinkProps;
export type BtnOutlineProps = Btn | Lnk;

const common =
  "max-md:text-sm p-3 rounded border border-gray-l2 dark:border-bluegray-d1 text-center hover:border-gray-l1 hover:dark:border-blue-d2";

export function BtnOutline(props: BtnOutlineProps) {
  if (props.as === "link") {
    const { className, ...rest } = props;
    return <Link className={common + ` ${className}`} {...rest} />;
  }
  const { className, ...rest } = props;
  return <button className={common + ` ${className}`} {...rest} />;
}

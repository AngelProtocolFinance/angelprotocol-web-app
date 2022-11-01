import React from "react";
import { Link } from "react-router-dom";
import { LinkProps } from "react-router-dom";

type Btn = {
  as: "btn";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
type Lnk = { as: "link" } & LinkProps;
export type BtnCancelProps = Btn | Lnk;

const common =
  "max-md:text-sm py-3 rounded border border-gray-l2 dark:border-bluegray-d1 text-center hover:border-gray-l1 hover:dark:border-blue-d2";

export function BtnCancel(props: BtnCancelProps) {
  if (props.as === "link") {
    const { className, ...rest } = props;
    return <Link className={common + ` ${className}`} {...rest} />;
  }
  const { className, ...rest } = props;
  return <button className={common + ` ${className}`} {...rest} />;
}

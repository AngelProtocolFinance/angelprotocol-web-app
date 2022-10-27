import React from "react";
import { Link } from "react-router-dom";
import { LinkProps } from "react-router-dom";

type Btn = {
  as: "btn";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
type Lnk = { as: "link" } & LinkProps;
type Props = Btn | Lnk;

const common =
  "max-md:text-sm py-3 rounded border border-gray-l2 dark:border-bluegray-d1 bg-orange-l5 dark:bg-blue-d5 text-center hover:bg-orange-l4 dark:hover:bg-blue-d3";

export function BtnBack(props: Props) {
  if (props.as === "link") {
    const { className, ...rest } = props;
    return <Link className={common + ` ${className}`} {...rest} />;
  }
  const { className, ...rest } = props;
  return <button className={common + ` ${className}`} {...rest} />;
}

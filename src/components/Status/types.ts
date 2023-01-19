import { PropsWithChildren } from "react";
import { IconBaseProps } from "react-icons";
import { IconTypes } from "components/Icon";

export type StatusProps = PropsWithChildren<{
  icon: IconTypes | JSX.Element;
  classes?: string;
  gap?: string;
}>;

import { Link } from "react-router-dom";
import { BtnProps } from "./types";

export default function BaseBtn({
  commonStyles,
  ...props
}: BtnProps & { commonStyles: string }) {
  if (props.as === "link") {
    const { className, ...rest } = props;
    return <Link className={commonStyles + ` ${className}`} {...rest} />;
  }
  const { className, ...rest } = props;
  return <button className={commonStyles + ` ${className}`} {...rest} />;
}

import { Link } from "react-router-dom";
import { BtnProps } from "./types";

export default function BaseBtn(props: BtnProps & { commonStyles: string }) {
  if (props.as === "link") {
    const { className, ...rest } = props;
    return <Link className={props.commonStyles + ` ${className}`} {...rest} />;
  }
  const { className, ...rest } = props;
  return <button className={props.commonStyles + ` ${className}`} {...rest} />;
}

import { Link } from "react-router-dom";
import { BtnProps } from "./types";

export default function BaseBtn({
  commonStyles,
  ...props
}: BtnProps & { commonStyles: string }) {
  switch (props.as) {
    case "link": {
      const { className, ...rest } = props;
      return <Link className={commonStyles + ` ${className}`} {...rest} />;
    }
    case "a": {
      const { className, children, ...rest } = props;
      return (
        <a className={commonStyles + ` ${className}`} {...rest}>
          {children}
        </a>
      );
    }
    default: {
      const { className, ...rest } = props;
      return <button className={commonStyles + ` ${className}`} {...rest} />;
    }
  }
}

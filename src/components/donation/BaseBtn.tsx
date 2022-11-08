import { Link } from "react-router-dom";
import { BtnProps } from "./types";

export function BaseBtn({
  commonStyles,
  className,
  ...props
}: BtnProps & { commonStyles: string }) {
  switch (props.as) {
    case "link": {
      return <Link className={commonStyles + ` ${className}`} {...props} />;
    }
    case "a": {
      const { children, ...rest } = props;
      return (
        <a className={commonStyles + ` ${className}`} {...rest}>
          {children}
        </a>
      );
    }
    default: {
      return <button className={commonStyles + ` ${className}`} {...props} />;
    }
  }
}

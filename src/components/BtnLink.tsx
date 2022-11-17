import { Link, LinkProps } from "react-router-dom";

type Btn = {
  as?: "btn";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
type Lnk = { as: "link" } & LinkProps & { disabled?: boolean };
type Ext = { as: "a" } & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    disabled?: boolean;
  };

export type BtnLinkProps = Btn | Lnk | Ext;

export function BtnLink(props: BtnLinkProps) {
  switch (props.as) {
    case "link": {
      const { className, disabled, ...rest } = props;
      return (
        <Link
          className={className + ` ${disabled ? "pointer-events-none" : ""}`}
          {...rest}
        />
      );
    }
    case "a": {
      /**
       * have to destructure because of lint warning
       * Anchors must have content and the content must be accessible by a screen reader
       */
      const { children, disabled, className, ...rest } = props;
      return (
        <a
          className={className + ` ${disabled ? "pointer-events-none" : ""}`}
          {...rest}
        >
          {children}
        </a>
      );
    }
    default: {
      const { type, ...rest } = props;
      return <button type={type || "button"} {...rest} />;
    }
  }
}

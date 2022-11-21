import { Link, LinkProps } from "react-router-dom";

type Btn = {
  as?: "btn";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
type Lnk = { as: "link" } & LinkProps;
type Ext = { as: "a" } & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type BtnLinkProps = Btn | Lnk | Ext;

export function BtnLink(props: BtnLinkProps) {
  switch (props.as) {
    case "link": {
      return <Link {...props} />;
    }
    case "a": {
      /**
       * have to destructure because of lint warning
       * Anchors must have content and the content must be accessible by a screen reader
       */
      const { children, ...rest } = props;
      return <a {...rest}>{children}</a>;
    }
    default: {
      const { type, ...rest } = props;
      return <button type={type || "button"} {...rest} />;
    }
  }
}

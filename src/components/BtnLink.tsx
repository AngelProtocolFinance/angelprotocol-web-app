import { Link, LinkProps } from "react-router-dom";
import ExtLink, { ExtLinkProps } from "./ExtLink";

type Btn = {
  as?: "btn";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
type Lnk = { as: "link" } & LinkProps;
type Ext = { as: "a" } & ExtLinkProps;

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
      return <ExtLink {...rest}>{children}</ExtLink>;
    }
    default: {
      return <button {...props} />;
    }
  }
}

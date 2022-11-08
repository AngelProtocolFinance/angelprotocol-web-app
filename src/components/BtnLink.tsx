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
      const { children, ...rest } = props;
      return <a {...rest}>{children}</a>;
    }
    default: {
      return <button {...props} />;
    }
  }
}

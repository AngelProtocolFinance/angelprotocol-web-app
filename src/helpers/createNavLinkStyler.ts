import { NavLinkProps } from "react-router-dom";

export function createNavLinkStyler(
  className: string,
  activeClassName: string,
): NavLinkProps["className"] {
  return (props: { isActive: boolean }) =>
    props.isActive ? `${className} ${activeClassName}` : className;
}

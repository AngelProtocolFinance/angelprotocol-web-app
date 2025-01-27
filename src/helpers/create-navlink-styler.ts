import type { NavLinkProps } from "@remix-run/react";

export function createNavLinkStyler(
  className: string,
  activeClassName: string
): NavLinkProps["className"] {
  return (props: { isActive: boolean }) =>
    props.isActive ? className + " " + activeClassName : className;
}

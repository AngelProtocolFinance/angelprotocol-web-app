import type { NavLinkProps } from "react-router";

export function nav_link_class_fn(
  classes: string,
  active_classes: string
): NavLinkProps["className"] {
  return (props: { isActive: boolean }) =>
    props.isActive ? `${classes} ${active_classes}` : classes;
}

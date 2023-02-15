import React from "react";

export type ExtLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "target" | "rel"
>;

export default function ExtLink({
  children,
  ...props
}: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel">) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

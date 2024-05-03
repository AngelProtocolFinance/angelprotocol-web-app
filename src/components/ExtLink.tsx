import type React from "react";

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

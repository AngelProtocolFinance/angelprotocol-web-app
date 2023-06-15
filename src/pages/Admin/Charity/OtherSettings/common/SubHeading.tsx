import { FC, PropsWithChildren } from "react";

export const SubHeading: FC<PropsWithChildren<{ classes?: string }>> = ({
  children,
  classes = "",
}) => <h3 className={`${classes} font-bold text-2xl`}>{children}</h3>;

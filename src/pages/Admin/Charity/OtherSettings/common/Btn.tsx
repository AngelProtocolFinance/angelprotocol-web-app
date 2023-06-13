import { FC, PropsWithChildren } from "react";

type Btn = FC<PropsWithChildren<{ classes?: string }>>;

export const Submit: Btn = ({ children, classes = "" }) => (
  <button type="submit" className={`${classes} btn-orange w-44 h-12 text-sm`}>
    {children}
  </button>
);

export const Reset: Btn = ({ children, classes = "" }) => (
  <button
    type="reset"
    className={`${classes} btn-outline-filled grow max-w-[11rem] h-12 text-sm`}
  >
    {children}
  </button>
);

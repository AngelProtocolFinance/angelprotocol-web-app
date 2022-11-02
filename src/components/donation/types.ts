import React from "react";
import { LinkProps } from "react-router-dom";

type Btn = {
  as?: "btn";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
type Lnk = { as: "link" } & LinkProps;

type Ext = { as: "a" } & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type BtnProps = Btn | Lnk | Ext;

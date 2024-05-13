import Icon from "components/Icon";
import type { ReactNode } from "react";
import { unpack } from "../form/helpers";
import useCopier from "./useCopier";

type Classes = string | { container?: string; icon?: string };

type Props = {
  text: string;
  classes?: Classes;
  size?: { copy?: number; check?: number };
  children?: ReactNode;
};

export default function Copier({ text, classes, size, children }: Props) {
  const { handleCopy, copied } = useCopier(text);
  const { container, icon } = unpack(classes);
  return (
    <button className={container} type="button" onClick={handleCopy}>
      {(copied && (
        <Icon
          type="Check"
          className={`${icon} cursor-default hover:text-current`}
          title="Copied!"
          size={size?.check}
        />
      )) || (
        <Icon
          type="Copy"
          className={`${icon} cursor-pointer`}
          title="Copy Address"
          size={size?.copy}
        />
      )}
      {children}
    </button>
  );
}

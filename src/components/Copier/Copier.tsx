import Icon from "components/Icon";
import { unpack } from "helpers";
import type { ReactNode } from "react";
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
    <button
      className={container + " relative"}
      type="button"
      onClick={handleCopy}
    >
      {(copied && (
        <Icon
          type="Check"
          className={`${icon} cursor-default hover:text-current`}
          size={size?.check}
          aria-labelledby="copied"
        />
      )) || (
        <Icon
          type="Copy"
          className={`${icon} cursor-pointer`}
          size={size?.copy}
          aria-labelledby="copy"
        />
      )}
      <span id="copied" className="invisible absolute">
        Copied!
      </span>
      <span id="copy" className="invisible absolute">
        Copy Address
      </span>
      {children}
    </button>
  );
}

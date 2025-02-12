import { unpack } from "helpers";
import { Check, Copy } from "lucide-react";
import type { ReactNode } from "react";
import useCopier from "./use-copier";

type Classes = string | { container?: string; icon?: string };

type Props = {
  text: string;
  classes?: Classes;
  size?: { copy?: number; check?: number } | number;
  children?: ReactNode;
};

export default function Copier({ text, classes, size, children }: Props) {
  const { handleCopy, copied } = useCopier(text);
  const { container, icon } = unpack(classes);
  const { check = 16, copy = 16 } = size
    ? typeof size === "number"
      ? { check: size, copy: size }
      : size
    : {};
  return (
    <button
      className={container + " relative"}
      type="button"
      onClick={handleCopy}
    >
      {(copied && (
        <Check
          className={`${icon} cursor-default text-green`}
          size={check}
          aria-labelledby="copied"
        />
      )) || (
        <Copy
          className={`${icon} cursor-pointer`}
          size={copy}
          aria-labelledby="copy"
        />
      )}
      <span id="copied" className="invisible absolute">
        Copied!
      </span>
      <span id="copy" className="invisible absolute">
        Copy
      </span>
      {children}
    </button>
  );
}

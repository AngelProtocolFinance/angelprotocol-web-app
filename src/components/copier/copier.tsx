import { unpack } from "helpers/unpack";
import { Check, Copy } from "lucide-react";
import type { ReactNode } from "react";
import { use_copier } from "./use-copier";

type Classes = string | { container?: string; icon?: string };

type Props = {
  text: string;
  classes?: Classes;
  size?: { copy?: number; check?: number } | number;
  children?: ReactNode;
};

export function Copier({ text, classes, size, children }: Props) {
  const { handle_copy, copied } = use_copier(text);
  const { container, icon } = unpack(classes);
  const { check = 16, copy = 16 } = size
    ? typeof size === "number"
      ? { check: size, copy: size }
      : size
    : {};
  return (
    <button className={`${container}`} type="button" onClick={handle_copy}>
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
      <span id="copied" className="sr-only">
        Copied!
      </span>
      <span id="copy" className="sr-only">
        Copy
      </span>
      {children}
    </button>
  );
}

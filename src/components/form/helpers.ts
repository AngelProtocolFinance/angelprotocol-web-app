import { Classes } from "./types";

export function unpack(classes?: Classes) {
  const _classes: Classes =
    typeof classes === "string" ? { container: classes } : classes || {};

  const { container = "", input = "", label: lbl = "", error = "" } = _classes;
  return { container, input, lbl, error };
}

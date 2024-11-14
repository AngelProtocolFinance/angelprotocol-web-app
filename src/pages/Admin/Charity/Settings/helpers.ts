import type { Target } from "./types";

export const toFormTarget = (target?: "smart" | (string & {})): Target => {
  if (!target) {
    return { type: "none" };
  }
  if (target === "0") {
    return { type: "none" };
  }
  if (target === "smart") {
    return { type: "smart" };
  }
  return { type: "fixed", value: target };
};

export const toTarget = (target: Target): "smart" | (string & {}) => {
  if (target.type === "none") {
    return "0";
  }
  if (target.type === "smart") {
    return "smart";
  }
  return target.value;
};

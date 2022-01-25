import { Icons } from "./types";

const key = "wallet_icon";

export function setIcon(icon: string) {
  localStorage.setItem(key, icon);
}

export function getIcon() {
  return localStorage.getItem(key);
}

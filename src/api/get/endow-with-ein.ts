import type { Endow } from "@better-giving/endowment";
import { ap, ver } from "../api";

export const getEndowWithEin = async (ein: string) => {
  const res = await ap.get<Endow>(`${ver(1)}/endowments/ein/${ein}`, {
    throwHttpErrors: false,
  });
  if (res.status === 404) return undefined;

  return res.json();
};

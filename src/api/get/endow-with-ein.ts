import { APIs } from "constants/urls";
import { version as v } from "services/helpers";
import type { Endowment } from "types/aws";

export const getEndowWithEin = async (ein: string) => {
  const url = new URL(APIs.aws);
  url.pathname = `${v(1)}/endowments/ein/${ein}`;
  const res = await fetch(url);
  if (res.status === 404) return undefined;

  if (!res.ok) throw await res.text();

  return res.json() as Promise<
    Pick<Endowment, "id" | "name" | "claimed" | "registration_number">
  >;
};

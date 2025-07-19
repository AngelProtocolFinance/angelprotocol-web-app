import type { Endow } from "@better-giving/endowment";
import type { UserV2 } from "types/auth";

export interface LoaderData {
  id: number;
  user: UserV2;
  endow: Pick<Endow, "logo" | "name" | "allocation">;
}

import { useOutletContext } from "@remix-run/react";
import type { UserV2 } from "types/auth";

export const useUser = (): UserV2 => useOutletContext();

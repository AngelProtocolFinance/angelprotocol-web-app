import { useOutletContext } from "@remix-run/react";
import type { UserV2 } from "types/auth";

export const useUser = () => useOutletContext() as UserV2;

import { useOutletContext } from "react-router";
import type { UserV2 } from "types/auth";

export const useUser = (): UserV2 => useOutletContext();

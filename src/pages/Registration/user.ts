import { useOutletContext } from "react-router";
import type { UserV2 } from "types/auth";

export const useUser = () => useOutletContext() as UserV2;

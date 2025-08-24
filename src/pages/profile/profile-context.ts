import type { INpo } from "@better-giving/endowment";
import { createContext, useContext } from "react";

const ProfileContext = createContext<INpo>({} as INpo);

export const useProfileContext = (): INpo => {
  const val = useContext(ProfileContext);

  if (Object.entries(val).length === 0) {
    throw new Error(
      "useProfileContext should only be used inside ProfileContext"
    );
  }
  return val;
};

export default ProfileContext;

import { createContext, useContext } from "react";
import { EndowmentBase } from "types/aws";

const ProfileContext = createContext<EndowmentBase>({} as EndowmentBase);

export const useProfileContext = (): EndowmentBase => {
  const val = useContext(ProfileContext);

  if (Object.entries(val).length <= 0) {
    throw new Error(
      "useProfileContext should only be used inside ProfileContext"
    );
  }
  return val;
};

export default ProfileContext;

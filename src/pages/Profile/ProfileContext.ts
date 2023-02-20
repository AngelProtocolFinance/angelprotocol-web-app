import { createContext, useContext } from "react";
import { EndowmentProfile } from "types/aws";

const ProfileContext = createContext<EndowmentProfile>({} as EndowmentProfile);

export const useProfileContext = (): EndowmentProfile => {
  const val = useContext(ProfileContext);

  if (Object.entries(val).length <= 0) {
    throw new Error(
      "useProfileContext should only be used inside ProfileContext"
    );
  }
  return val;
};

export default ProfileContext;

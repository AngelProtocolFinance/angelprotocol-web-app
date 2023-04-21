import { createContext, useContext } from "react";
import { Profile } from "services/types";

const ProfileContext = createContext<Profile>({} as Profile);

export const useProfileContext = (): Profile => {
  const val = useContext(ProfileContext);

  if (Object.entries(val).length <= 0) {
    throw new Error(
      "useProfileContext should only be used inside ProfileContext"
    );
  }
  return val;
};

export default ProfileContext;

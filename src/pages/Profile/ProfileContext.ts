import { createContext, useContext } from "react";
import { EndowmentInfo } from "types/aws";

const ProfileContext = createContext<EndowmentInfo>({} as EndowmentInfo);

export const useProfileContext = (): EndowmentInfo => {
  const val = useContext(ProfileContext);

  if (Object.entries(val).length <= 0) {
    throw new Error(
      "useProfileContext should only be used inside ProfileContext"
    );
  }
  return val;
};

export default ProfileContext;

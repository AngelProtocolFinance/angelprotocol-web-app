import { createContext, useContext } from "react";
import { EndowmentProfile } from "types/aws";
import { isEmpty } from "helpers";

const ProfileContext = createContext<EndowmentProfile>({} as EndowmentProfile);

export const useProfileContext = (): EndowmentProfile => {
  const val = useContext(ProfileContext);

  if (isEmpty(Object.entries(val))) {
    throw new Error(
      "useProfileContext should only be used inside ProfileContext",
    );
  }
  return val;
};

export default ProfileContext;

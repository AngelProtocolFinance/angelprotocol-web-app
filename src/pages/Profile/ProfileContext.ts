import { createContext, useContext } from "react";
import { ProfileResponse } from "types/contracts";

type ProfileContextType = ProfileResponse & {
  id: number;
  kyc_donors_only: boolean;
};

const ProfileContext = createContext<ProfileContextType>(
  {} as ProfileContextType
);

export const useProfileContext = (): ProfileContextType => {
  const val = useContext(ProfileContext);

  if (Object.entries(val).length <= 0) {
    throw new Error(
      "useProfileContext should only be used inside ProfileContext"
    );
  }
  return val;
};

export default ProfileContext;

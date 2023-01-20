import { createContext, useContext } from "react";
import { Endowment } from "types/aws";

const ProfileContext = createContext<Endowment>({} as Endowment);

export const useProfileContext = (): Endowment => {
  const val = useContext(ProfileContext);

  if (Object.entries(val).length <= 0) {
    throw new Error(
      "useProfileContext should only be used inside ProfileContext"
    );
  }
  return val;
};

export default ProfileContext;

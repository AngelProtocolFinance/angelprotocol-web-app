import type { Endow } from "@better-giving/endowment";
import { isEmpty } from "helpers";
import { createContext, useContext } from "react";

const ProfileContext = createContext<Endow>({} as Endow);

export const useProfileContext = (): Endow => {
  const val = useContext(ProfileContext);

  if (isEmpty(Object.entries(val))) {
    throw new Error(
      "useProfileContext should only be used inside ProfileContext"
    );
  }
  return val;
};

export default ProfileContext;

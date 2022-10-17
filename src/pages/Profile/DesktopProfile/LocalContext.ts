import { createContext, useContext } from "react";
import { ProfileContextType } from "../types";

type LocalContextType = Required<Pick<ProfileContextType, "profile">>;

const LocalContext = createContext<LocalContextType>({} as LocalContextType);

export const useLocalContext = (): LocalContextType => {
  const val = useContext(LocalContext);

  if (Object.entries(val).length <= 0) {
    throw new Error(
      "useLocalContext should only be used inside DesktopProfile > LocalContext"
    );
  }
  return val;
};

export default LocalContext;

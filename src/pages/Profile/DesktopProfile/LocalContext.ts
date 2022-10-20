import { createContext, useContext } from "react";
import { ProfileContextType } from "../types";

type ReqCtxType = Required<ProfileContextType>;

type LocalContextType = Pick<ReqCtxType, "profile">["profile"] &
  Pick<ReqCtxType, "kyc_donors_only" | "id">;

const LocalContext = createContext<LocalContextType>({} as LocalContextType);

export const useLocalContext = (): LocalContextType => {
  const val = useContext(LocalContext);

  if (Object.entries(val).length <= 0) {
    throw new Error("useLocalContext should only be used inside LocalContext");
  }
  return val;
};

export default LocalContext;

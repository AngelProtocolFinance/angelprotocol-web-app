import { PropsWithChildren, createContext } from "react";
import { useParams } from "react-router-dom";
import { ProfileContextType } from "./types";
import {
  useEndowmentDetailsQuery,
  useEndowmentProfileQuery,
} from "services/juno/account";
import { idParamToNum } from "helpers";

export const ProfileContext = createContext<ProfileContextType>(
  {} as ProfileContextType
);

export default function ProfileProvider(props: PropsWithChildren<{}>) {
  const { id } = useParams<{ id: string }>();
  const numId = idParamToNum(id);
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useEndowmentProfileQuery({ id: numId }, { skip: numId === 0 });

  const {
    data: endowment,
    isLoading: isEndowLoading,
    isError: isEndowError,
  } = useEndowmentDetailsQuery({ id: numId }, { skip: numId === 0 });

  return (
    <ProfileContext.Provider
      value={{
        profile:
          !!profile && !!endowment
            ? {
                ...profile,
                id: numId, //!isError && numId is valid id
                kyc_donors_only: endowment.kyc_donors_only,
              }
            : undefined,
        isLoading: isEndowLoading || isProfileLoading,
        isError: isEndowError || isProfileError,
      }}
    >
      <div>{props.children}</div>
    </ProfileContext.Provider>
  );
}

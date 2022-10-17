import { PropsWithChildren, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProfileResponse } from "types/contracts";
import {
  useEndowmentDetailsQuery,
  useEndowmentProfileQuery,
} from "services/juno/account";
import { idParamToNum } from "helpers";

type ProfileExtended = {
  profile?: ProfileResponse & { id: number };
  kyc_donors_only?: boolean;
  isLoading: boolean;
  isError: boolean;
};

const ProfileContext = createContext<ProfileExtended>({} as ProfileExtended);

export const useProfileContext = () => {
  const val = useContext(ProfileContext);
  if (Object.entries(val).length <= 0) {
    throw new Error(
      "useProfile hook should only be used inside Profile context"
    );
  }
  return val; //val is defined here
};

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
        profile: !!profile
          ? {
              ...profile,
              id: numId, //!isError && numId is valid id
            }
          : undefined,
        kyc_donors_only: endowment?.kyc_donors_only,
        isLoading: isEndowLoading || isProfileLoading,
        isError: isEndowError || isProfileError,
      }}
    >
      <div>{props.children}</div>
    </ProfileContext.Provider>
  );
}

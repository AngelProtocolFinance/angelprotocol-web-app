import { ProfileResponse } from "types/contracts";

export type ProfileContextType = {
  profile?: ProfileResponse & { kyc_donors_only: boolean };
  isLoading: boolean;
  isError: boolean;
};

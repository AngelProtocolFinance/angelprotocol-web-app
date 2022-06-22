import useAccountContract from "services/terra/account/useAccountContract";
import { useContract } from "services/terra/useContract";
import Registrar, { R, T } from "contracts/Registrar";
import {
  useCategorizedEndowmentsQuery,
  useEndowmentCWsQuery,
  useEndowmentProfileQuery,
} from ".";

export function useCategorizedEndowments() {
  const { contract } = useContract<R, T>(Registrar);
  const {
    data = {},
    isError,
    isLoading,
    isFetching,
  } = useCategorizedEndowmentsQuery(
    contract.endowmentList({
      endow_type: "charity",
      status: "1",
    })
  );
  return {
    endowments: data,
    isEndowmentsError: isError,
    isEndowmentsLoading: isLoading || isFetching,
  };
}

export function useEndowmentProfile(address: string, skip = false) {
  const { contract } = useAccountContract(address);
  const { data, isError, isLoading, isFetching } = useEndowmentProfileQuery(
    contract.profile,
    { skip }
  );

  return {
    profile: data,
    isProfileError: isError,
    isProfileLoading: isLoading || isFetching,
  };
}

export function useEndowmentCWs(address?: string) {
  const {
    data = {},
    isLoading,
    isFetching,
  } = useEndowmentCWsQuery(address!, { skip: !address });

  return {
    cwContracts: data,
    isCWContractsLoading: isLoading || isFetching,
  };
}

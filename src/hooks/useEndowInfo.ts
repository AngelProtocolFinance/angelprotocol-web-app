import { EndowmentInfo } from "services/types";
import { useProfileQuery } from "services/aws/aws";
import { useEndowInfoQuery } from "services/juno/custom";

type Result = {
  isError: boolean;
  isLoading: boolean;
  data?: EndowmentInfo;
};

export default function useEndowInfo(endowId: number): Result {
  const endowInfoQueryState = useEndowInfoQuery(endowId, { skip: !endowId });
  const profileQueryState = useProfileQuery(endowId, { skip: !endowId });

  const queryState: Result = {
    isError: endowInfoQueryState.isError || profileQueryState.isError,
    isLoading: endowInfoQueryState.isLoading || profileQueryState.isLoading,
    data:
      !!endowInfoQueryState.data && !!profileQueryState.data
        ? {
            ...endowInfoQueryState.data,
            ...profileQueryState.data,
            id: endowId,
          }
        : undefined,
  };

  return queryState;
}

import { useEffect } from "react";
import { NetworkType } from "types/server/aws";
import useErrorContext from "hooks/useErrorContext";
import { WrongNetworkError } from "errors/errors";
import { EXPECTED_NETWORK_TYPE } from "constants/env";

export default function useVerifyNetwork(networkType: NetworkType) {
  const { handleError } = useErrorContext();

  useEffect(() => {
    if (networkType !== EXPECTED_NETWORK_TYPE) {
      handleError(new WrongNetworkError());
    }
  }, [networkType]);
}

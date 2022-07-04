import { junoApi } from "services/juno";

export function useLatestBlock(pollInterval = 0) {
  const { useLatestBlockQuery } = junoApi;
  const { data = "0" } = useLatestBlockQuery("", {
    pollingInterval: pollInterval,
  });
  return data;
}

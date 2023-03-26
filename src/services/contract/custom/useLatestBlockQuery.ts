import useSWR from "swr";
import { JUNO_LCD } from "constants/env";

type BlockLatest = {
  block_id: any;
  block: { header: { height: string } };
};

export default function useLatestBlockQuery(pollInterval = 0) {
  return useSWR("latest-block", fetchLatestBlock, {
    refreshInterval: pollInterval,
  });
}

export async function fetchLatestBlock() {
  return fetch(JUNO_LCD + "/blocks/latest")
    .then<BlockLatest>((res) => res.json())
    .then((d) => d.block.header.height);
}

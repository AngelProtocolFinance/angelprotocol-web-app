import { FormValues as FV } from "./types";
import { useChainsQuery } from "services/apes";
import QueryLoader from "components/QueryLoader";
import { Selector, selectorButtonStyle } from "components/Selector";

export default function NetworkDropdown({ classes = "" }) {
  const queryState = useChainsQuery("");

  return (
    <div className={classes + " grid gap-2"}>
      <label className="text-sm">Network</label>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Fetching network options...",
          error: "Failed to get network options",
          empty: "No network to choose from",
        }}
        //filterFn: TODO show only network related to donor address
        classes={{
          container:
            selectorButtonStyle + " bg-white dark:bg-blue-d6 px-4 py-3",
        }}
      >
        {(networks) => (
          <Selector<FV, "network", string, false>
            name="network"
            classes={{ button: "dark:bg-blue-d6" }}
            options={networks.map((n) => ({
              label: n.chain_name,
              value: n.chain_name,
            }))}
          />
        )}
      </QueryLoader>
    </div>
  );
}

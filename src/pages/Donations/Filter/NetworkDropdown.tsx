import { FilterFormValues as FV } from "./types";
import { useChainsQuery } from "services/apes";
import { Selector } from "components/Selector";

export default function NetworkDropdown() {
  const { data: networks = [] } = useChainsQuery("");
  return (
    <Selector<FV, "network", string, false>
      name="network"
      options={networks.map((n) => ({
        label: n.chain_name,
        value: n.chain_name,
      }))}
    />
  );
}

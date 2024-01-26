import { Selector } from "components/Selector";
import { chains } from "constants/chains";
import { FormValues as FV } from "./types";

export default function NetworkDropdown({ classes = "" }) {
  return (
    <div className={`${classes} grid gap-2`}>
      <label className="text-sm">Network</label>
      <Selector<FV, "network", string>
        name="network"
        classes={{ button: "dark:bg-blue-d6" }}
        options={Object.entries(chains).map(([, chain]) => ({
          label: chain.name,
          value: chain.name,
        }))}
      />
    </div>
  );
}

import { Selector } from "components/Selector";
import { chains } from "constants/chains";
import type { Donation } from "types/aws";
import type { OptionType } from "types/components";
import type { FormValues as FV } from "./types";

const fiatNetworks: OptionType<string>[] = [
  { label: "Fiat", value: "fiat" },
] satisfies OptionType<Extract<Donation.Record["viaId"], "fiat">>[];

export default function NetworkDropdown({ classes = "" }) {
  return (
    <div className={classes + " grid gap-2"}>
      <label className="text-sm">Network</label>
      <Selector<FV, "network", string>
        name="network"
        classes={{ button: "dark:bg-blue-d6", options: "text-sm" }}
        options={fiatNetworks.concat(
          Object.entries(chains).map(([, chain]) => ({
            label: chain.name,
            value: chain.id,
          }))
        )}
      />
    </div>
  );
}

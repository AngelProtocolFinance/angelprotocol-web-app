import { Selector } from "components/Selector";
import { statuses } from "./constants";
import type { FormValues as FV } from "./types";

export default function StatusDropdown({ classes = "" }) {
  return (
    <div className={classes + " grid gap-2"}>
      <label className="text-sm">Status</label>
      <Selector<FV, "status", string>
        name="status"
        classes={{ button: "dark:bg-blue-d6", options: "text-sm" }}
        options={statuses}
      />
    </div>
  );
}

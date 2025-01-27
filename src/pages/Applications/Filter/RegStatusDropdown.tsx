import { Selector } from "components/selector";
import { statuses } from "./constants";
import type { FormValues as FV } from "./types";

export default function RegStatusDropdown({ classes = "" }) {
  return (
    <div className={classes + " grid gap-2"}>
      <label className="text-sm">Application Status</label>
      <Selector<FV, "status", string>
        name="status"
        classes={{ button: "dark:bg-blue-d6", options: "text-sm" }}
        options={statuses}
      />
    </div>
  );
}

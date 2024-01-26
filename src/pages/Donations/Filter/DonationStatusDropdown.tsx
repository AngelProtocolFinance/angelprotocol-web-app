import { Selector } from "components/Selector";
import { statuses } from "./constants";
import { FormValues as FV } from "./types";

export default function DonationStatusDropdown({ classes = "" }) {
  return (
    <div className={`${classes} grid gap-2`}>
      <label className="text-sm">Status</label>
      <Selector<FV, "status", string>
        name="status"
        classes={{ button: "dark:bg-blue-d6" }}
        options={statuses}
      />
    </div>
  );
}

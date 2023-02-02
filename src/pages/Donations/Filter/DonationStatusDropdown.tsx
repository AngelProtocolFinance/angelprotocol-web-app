import { FormValues as FV } from "./types";
import { Selector } from "components/Selector";

const statuses = [
  { label: "RECEIVED", value: "RECEIVED" },
  { label: "PENDING", value: "PENDING" },
];

export default function DonationStatusDropdown({ classes = "" }) {
  return (
    <div className={classes + " grid gap-2"}>
      <label className="text-sm">Status</label>
      {statuses.map(() => (
        <Selector<FV, "status", string, false>
          name="status"
          classes={{ button: "dark:bg-blue-d6" }}
          options={statuses}
        />
      ))}
    </div>
  );
}

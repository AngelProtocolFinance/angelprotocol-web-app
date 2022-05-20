import { ApplicationStatusOptions } from "@types-server/aws";

type Props = {
  activeStatus: ApplicationStatusOptions;
  onStatusChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function StatusSelector(props: Props) {
  const { activeStatus, onStatusChange } = props;
  return (
    <div className="flex gap-2 items-center">
      <label
        htmlFor="status_selector"
        className="uppercase text-white text-sm font-heading font-bold"
      >
        status
      </label>
      <select
        value={activeStatus}
        onChange={onStatusChange}
        id="status_selector"
        className="bg-white/10 text-white-grey p-2 text-sm rounded-md focus:outline-none uppercase "
      >
        {Object.entries(pollStatusOptions).map(
          ([optionValue, optionDescription]) => (
            <option
              key={optionValue}
              value={optionValue}
              className="text-sm text-angel-grey uppercase p-1"
            >
              {optionDescription}
            </option>
          )
        )}
      </select>
    </div>
  );
}

const pollStatusOptions: { [key in ApplicationStatusOptions]: string } = {
  all: "all",
  // active: "Active",
  approved: "Approved",
  "not-complete": "Not Complete",
  "under-review": "Under-Review",
};

import { PollStatus } from "services/terra/gov/types";

export default function PollSelector({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  return (
    <label
      className="w-full rounded-md bg-white/10 border-none p-3 px-5 text-sm uppercase shadow-inner"
      htmlFor="poll_filter"
    >
      <select
        name="poll_status"
        onChange={(e: any) => onChange(e.target.value)}
        id="poll_filter"
        className="cursor-pointer bg-transparent text-white text-opacity-80 focus:outline-none"
      >
        <>
          <option value="all" className={`text-sm text-angel-grey mr-1`}>
            All
          </option>
          {Object.entries(PollStatus).map(([_key, val]) => (
            <option key={val} value={val} className={`text-sm text-angel-grey`}>
              {`${val.split("_").join(" ").toUpperCase()}`}
            </option>
          ))}
        </>
      </select>
    </label>
  );
}

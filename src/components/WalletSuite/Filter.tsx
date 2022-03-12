export default function Filter(props: {
  filtered: boolean;
  handleFilter: () => void;
}) {
  return (
    <div
      className={`flex items-center justify-self-start mt-2 ml-2 rounded-sm ${
        props.filtered
          ? "border border-angel-blue/80 bg-angel-blue bg-opacity-30"
          : "border border-grey-accent/80 bg-thin-grey bg-opacity-30"
      }`}
    >
      <input
        checked={props.filtered}
        onChange={props.handleFilter}
        id="filter"
        type="checkbox"
        className="ml-1"
      />
      <label
        htmlFor="filter"
        className="p-1 pb-0.5 text-angel-grey text-xs select-none cursor-pointer"
      >
        small amounts
      </label>
    </div>
  );
}

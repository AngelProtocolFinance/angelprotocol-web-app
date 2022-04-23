import Icon from "components/Icons/Icons";

export default function Toolbar(props: {
  searchText: string;
  handleSearchTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex justify-end bg-angel-grey/10 p-3 sticky top-0 backdrop-filter backdrop-blur-sm">
      <div className="flex bg-light-grey text-angel-grey shadow-inner-white-grey p-1.5 rounded-md">
        <input
          id="__allianceSearch"
          placeholder="name or address"
          className="font-mono focus:outline-none bg-light-grey text-sm"
          type="text"
          value={props.searchText}
          onChange={props.handleSearchTextChange}
        />
        <label htmlFor="__allianceSearch" className="self-center">
          <Icon type="Search" size={20} />
        </label>
      </div>
    </div>
  );
}

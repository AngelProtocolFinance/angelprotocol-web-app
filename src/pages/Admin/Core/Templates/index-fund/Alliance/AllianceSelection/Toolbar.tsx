import Icon from "components/Icon";

export default function Toolbar(props: {
  searchText: string;
  handleSearchTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex justify-end bg-gray-d2/10 p-3 sticky top-0 backdrop-filter backdrop-blur-sm">
      <div className="flex bg-gray-l2 text-gray-d2 shadow-inner-white p-1.5 rounded-md">
        <input
          id="__allianceSearch"
          placeholder="name or address"
          className="font-mono focus:outline-none bg-gray-l2 text-sm"
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

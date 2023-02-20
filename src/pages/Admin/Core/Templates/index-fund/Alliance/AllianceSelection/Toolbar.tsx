import Icon from "components/Icon";

export default function Toolbar(props: {
  searchText: string;
  handleSearchTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex justify-end bg-orange-l5 dark:bg-blue-d5 p-3 sticky top-0">
      <div className="flex px-3 py-1.5 rounded bg-orange-l6 dark:bg-blue-d7 border border-prim">
        <input
          id="__allianceSearch"
          placeholder="name or address"
          className="focus:outline-none bg-transparent text-sm"
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

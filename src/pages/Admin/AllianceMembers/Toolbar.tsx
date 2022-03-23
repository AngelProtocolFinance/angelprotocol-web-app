import { admin, proposal_types } from "constants/routes";
import { BiSearchAlt2 } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function ToolBar(props: {
  searchText: string;
  handleSearchTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="bg-light-grey p-2 flex gap-2 justify-end">
      <div className="flex bg-light-grey text-angel-grey shadow-inner-white-grey p-2 rounded-md">
        <input
          id="__allianceSearch"
          placeholder="name or address"
          className="font-mono focus:outline-none bg-light-grey"
          type="text"
          value={props.searchText}
          onChange={props.handleSearchTextChange}
        />
        <label htmlFor="__allianceSearch" className="self-center">
          <BiSearchAlt2 size={25} />
        </label>
      </div>
      <Link
        to={`../${admin.proposal_types}/${proposal_types.alliance_members}`}
        className="text-xs font-heading uppercase font-bold flex items-center gap-1 bg-angel-blue text-white px-2 rounded-sm hover:bg-bright-blue active:bg-angel-orange"
      >
        add/remove member
      </Link>
    </div>
  );
}

import { useSetModal } from "components/Modal/Modal";
import { BiSearchAlt2 } from "react-icons/bi";
import MemberForm from "./MemberEditor/MemberForm";
import MemberEditor, { Props } from "./MemberEditor/MemberEditor";
export default function ToolBar(props: {
  searchText: string;
  handleSearchTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const { showModal } = useSetModal();

  function showAddForm() {
    showModal<Props>(MemberEditor, {
      Form: MemberForm,
    });
  }

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
      <button
        type="button"
        onClick={showAddForm}
        className="text-xs font-heading uppercase font-bold flex items-center gap-1 
        bg-angel-blue text-white px-2 rounded-sm hover:bg-bright-blue active:bg-angel-orange"
      >
        <span className="text-lg">+</span>
        <span>new member</span>
      </button>
    </div>
  );
}

import { useSetModal } from "components/Modal/Modal";
import { BiSearchAlt2 } from "react-icons/bi";
import AddMemberForm from "./MemberAdder/AddMemberForm";
import MemberAdder, { Props } from "./MemberAdder/MemberAdder";
export default function ToolBar(props: {
  searchText: string;
  handleSearchTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const { showModal } = useSetModal();

  function showAddForm() {
    showModal<Props>(MemberAdder, {
      Form: AddMemberForm,
    });
  }

  return (
    <div className="bg-light-grey p-2 flex gap-2 justify-end">
      <div className="flex bg-light-grey text-angel-grey shadow-inner-white-grey p-2 rounded-md">
        <input
          id="__allianceSearch"
          placeholder="search member"
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
        bg-angel-blue text-white px-2 rounded-sm active:bg-blue-accent hover:bg-dark-blue"
      >
        <span className="text-lg">+</span>
        <span>new member</span>
      </button>
    </div>
  );
}

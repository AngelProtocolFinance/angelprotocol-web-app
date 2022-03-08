import { FaUserCircle } from "react-icons/fa";
import { CgUndo } from "react-icons/cg";
import { GiPieChart } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useSetter } from "store/accessors";
import {
  undoAddMember,
  toggleDeleteExistingMember,
  MemberCopy,
} from "services/admin/apCW4Members";

export default function MemberItem(props: MemberCopy) {
  const dispatch = useSetter();
  function memberItemAction() {
    if (props.is_added) {
      dispatch(undoAddMember(props.addr));
    } else {
      dispatch(toggleDeleteExistingMember(props.addr));
    }
  }
  return (
    <li
      className={`flex gap-1 text-angel-grey items-center ${
        props.is_deleted ? "bg-red-400 bg-opacity-30" : ""
      } ${
        props.is_added ? "bg-green-400 bg-opacity-30" : ""
      } rounded-md p-2 w-full`}
    >
      <FaUserCircle />
      <span
        className={`${
          props.is_deleted ? "line-through" : ""
        } text-sm font-mono`}
      >
        {props.addr}
      </span>
      <GiPieChart className="ml-auto" />
      <span> {props.weight}</span>
      <button
        onClick={memberItemAction}
        type="button"
        className="bg-white bg-opacity-30 ml-2 rounded-md p-0.5"
      >
        {props.is_added || props.is_deleted ? <CgUndo /> : <IoClose />}
      </button>
    </li>
  );
}

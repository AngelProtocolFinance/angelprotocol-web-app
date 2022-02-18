import { FaUserCircle } from "react-icons/fa";
import { CgUndo } from "react-icons/cg";
import { GiPieChart } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import maskAddress from "helpers/maskAddress";
import { useSetter } from "store/accessors";
import {
  undoAddMember,
  toggleDeleteExistingMember,
} from "services/admin/memberSlice";
import { MemberCopy } from "./MemberUpdator";

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
      className={`flex gap-1 text-white text-opacity-80 items-center bg-opacity-10 shadow-inner ${
        props.is_deleted ? "bg-red-400 bg-opacity-30" : "bg-white"
      } ${
        props.is_added ? "bg-green-400 bg-opacity-30" : ""
      } rounded-md p-2 w-full`}
    >
      <FaUserCircle />
      <span className={`${props.is_deleted ? "line-through" : ""}`}>
        {" "}
        {maskAddress(props.addr)}
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

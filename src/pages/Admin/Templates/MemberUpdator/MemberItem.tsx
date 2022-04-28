import { MemberCopy } from "@types-slice/admin";
import {
  toggleDeleteExistingMember,
  undoAddMember,
} from "slices/admin/apCW4Members";
import { useSetter } from "store/accessors";
import Icon from "components/Icons/Icons";

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
        props.is_deleted ? "bg-red-400/30" : ""
      } ${props.is_added ? "bg-green-400/30" : ""} rounded-md p-2 w-full`}
    >
      <Icon type="User" />
      <span
        className={`${
          props.is_deleted ? "line-through" : ""
        } text-sm font-mono`}
      >
        {props.addr}
      </span>
      <Icon type="PieChart" className="ml-auto" />
      <span> {props.weight}</span>
      <button
        onClick={memberItemAction}
        type="button"
        className="bg-white/30 ml-2 rounded-md p-0.5"
      >
        {props.is_added || props.is_deleted ? (
          <Icon type="Undo" />
        ) : (
          <Icon type="Close" />
        )}
      </button>
    </li>
  );
}

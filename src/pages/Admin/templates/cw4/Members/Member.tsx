import { MemberCopy } from "slices/admin/types";
import Icon from "components/Icon";
import { useSetter } from "store/accessors";
import {
  toggleDeleteExistingMember,
  undoAddMember,
} from "slices/admin/apCW4Members";

export default function Member(props: MemberCopy) {
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
      className={`flex gap-1 text-gray-d2 items-center ${
        props.is_deleted ? "bg-red-l1/30" : ""
      } ${props.is_added ? "bg-green-l1/30" : ""} rounded-md p-2 w-full`}
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

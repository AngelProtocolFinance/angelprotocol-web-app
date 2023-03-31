import { AddressWithFlags } from "slices/admin/types";
import Icon from "components/Icon";
import { useSetter } from "store/accessors";
import {
  toggleDeleteExistingMember,
  undoAddMember,
} from "slices/admin/fundMembers";

export default function Member(props: AddressWithFlags) {
  const dispatch = useSetter();
  function memberItemAction() {
    if (props.isAdded) {
      dispatch(undoAddMember(props.id));
    } else {
      dispatch(toggleDeleteExistingMember(props.id));
    }
  }
  return (
    <li
      className={`flex gap-1 text-gray-d2 items-center ${
        props.isDeleted ? "bg-red/30" : ""
      } ${props.isAdded ? "bg-green/30" : ""} rounded-md p-2 w-full`}
    >
      <Icon type="User" />
      <span
        className={`${props.isDeleted ? "line-through" : ""} text-sm font-mono`}
      >
        {props.id}
      </span>
      <button
        onClick={memberItemAction}
        type="button"
        className="bg-white/30 ml-2 rounded-md p-0.5"
      >
        {props.isAdded || props.isDeleted ? (
          <Icon type="Undo" />
        ) : (
          <Icon type="Close" />
        )}
      </button>
    </li>
  );
}

import { useSetter } from "store/accessors";
import Icon from "components/Icons/Icons";
import {
  undoAddMember,
  toggleDeleteExistingMember,
} from "services/admin/fundMembers";
import { AddressWithFlags } from "services/admin/fundMembers";

export default function MemberItem(props: AddressWithFlags) {
  const dispatch = useSetter();
  function memberItemAction() {
    if (props.isAdded) {
      dispatch(undoAddMember(props.addr));
    } else {
      dispatch(toggleDeleteExistingMember(props.addr));
    }
  }
  return (
    <li
      className={`flex gap-1 text-angel-grey items-center ${
        props.isDeleted ? "bg-red-400 bg-opacity-30" : ""
      } ${
        props.isAdded ? "bg-green-400 bg-opacity-30" : ""
      } rounded-md p-2 w-full`}
    >
      <Icon type="User" />
      <span
        className={`${props.isDeleted ? "line-through" : ""} text-sm font-mono`}
      >
        {props.addr}
      </span>
      <button
        onClick={memberItemAction}
        type="button"
        className="bg-white bg-opacity-30 ml-2 rounded-md p-0.5 ml-auto"
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

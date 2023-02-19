import { useSetter } from "@/store/accessors";
import Icon from "@ap/components/icon";
import { apCW4Members as APMembers, MemberCopy } from "@ap/slices/admin";

export default function Member(props: MemberCopy) {
  const dispatch = useSetter();
  function memberItemAction() {
    if (props.is_added) {
      dispatch(APMembers.undoAdd(props.addr));
    } else {
      dispatch(APMembers.toggleDeleteExisting(props.addr));
    }
  }
  return (
    <li
      className={`flex gap-1 text-gray-d1 dark:text-gray items-center ${
        props.is_deleted ? "bg-red-l4/30 dark:bg-red-d2/30" : ""
      } ${
        props.is_added ? "bg-green-l3 dark:bg-green-l1/30" : ""
      } rounded-md p-2 w-full`}
    >
      <Icon type="User" />
      <span className={`${props.is_deleted ? "line-through" : ""} text-sm`}>
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

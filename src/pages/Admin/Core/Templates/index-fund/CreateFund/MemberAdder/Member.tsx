import Icon from "components/Icon";
import { useSetter } from "store/accessors";
import { removeFundMember } from "slices/admin/newFundMembers";

export default function Member(props: { id: number }) {
  const dispatch = useSetter();

  function deleteSelf() {
    dispatch(removeFundMember(props.id));
  }
  return (
    <div
      className="font-mono text-sm text-gray-d2 bg-green-l4 shadow-inner p-1.5 
    rounded-md flex items-center"
    >
      <span>{props.id}</span>
      <button type="button" onClick={deleteSelf} className="ml-1 text-red-l1">
        <Icon type="Close" />
      </button>
    </div>
  );
}

import Icon from "@giving/components/Icon";
import { removeFundMember } from "@giving/slices/admin/newFundMembers";
import { useSetter } from "@giving/store";

export default function Member(props: { address: string }) {
  const dispatch = useSetter();

  function deleteSelf() {
    dispatch(removeFundMember(props.address));
  }
  return (
    <div
      className="font-mono text-sm text-gray-d2 bg-green-l4 shadow-inner p-1.5 
    rounded-md flex items-center"
    >
      <span>{props.address}</span>
      <button type="button" onClick={deleteSelf} className="ml-1 text-red-l1">
        <Icon type="Close" />
      </button>
    </div>
  );
}

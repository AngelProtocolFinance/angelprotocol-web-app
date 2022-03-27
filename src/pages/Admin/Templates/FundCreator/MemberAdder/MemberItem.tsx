import Icon from "components/Icons/Icons";
import { removeFundMember } from "services/admin/newFundMembers";
import { useSetter } from "store/accessors";
export default function MemberItem(props: { address: string }) {
  const dispatch = useSetter();

  function deleteSelf() {
    dispatch(removeFundMember(props.address));
  }
  return (
    <div
      className="font-mono text-sm text-angel-grey bg-green-100 shadow-inner p-1.5 
    rounded-md flex items-center"
    >
      <span>{props.address}</span>
      <button type="button" onClick={deleteSelf} className="ml-1 text-red-400">
        <Icon type="Close" />
      </button>
    </div>
  );
}

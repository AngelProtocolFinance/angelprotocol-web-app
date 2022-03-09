import { useState } from "react";
import { useSetModal } from "components/Modal/Modal";
import { IoClose } from "react-icons/io5";
import { MemberDetails } from "services/aws/alliance/types";
import { useRemoveMemberMutation } from "services/aws/alliance/alliance";

export default function DeleteMemberPrompt(props: MemberDetails) {
  const { hideModal } = useSetModal();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [removeMember] = useRemoveMemberMutation();

  async function deleteMember() {
    setIsDeleting(true);
    const response = await removeMember({
      name: props.name,
      address: props.address,
    });

    if ("error" in response) {
      setIsDeleting(false);
      setError("failed to delete member");
    } else {
      setIsDeleting(false);
      hideModal();
    }
  }

  return (
    <div className="p-4 grid place-items-center content-center bg-white-grey w-full max-w-xs min-h-115 rounded-xl shadow-lg overflow-hidden relative">
      <button className="absolute top-3 right-3" onClick={hideModal}>
        <IoClose className="text-angel-grey" />
      </button>
      <p className="text-angel-grey">Are you sure you want to delete</p>
      <p>
        <span className="font-bold font-mono">{props.name}</span> ?
      </p>

      {error && (
        <p className="font-mono text-sm font-bold text-red-400 mt-4">
          {"failed to delete"}
        </p>
      )}
      <button
        disabled={isDeleting}
        onClick={deleteMember}
        className="text-xs font-extrabold text-white 
        bg-angel-blue hover:bg-blue-accent active:bg-angel-orange disabled:bg-grey-accent
        uppercase rounded-sm px-4 py-2 mt-4"
      >
        confirm
      </button>
    </div>
  );
}

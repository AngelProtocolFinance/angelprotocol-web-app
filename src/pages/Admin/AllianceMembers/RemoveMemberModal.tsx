import { useState } from "react";
import { useRemoveMemberMutation } from "services/aws/alliance/alliance";
import { useModalCloser } from "../../../components/Modal/Modal";

const RemoveMemberModal = ({ member }: any) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const closeModal = useModalCloser();
  const [removeMember] = useRemoveMemberMutation();

  const handleRemove = async () => {
    setSubmitting(true);
    const response: any = await removeMember({
      name: member.name,
      wallet: "",
    });
    setSubmitting(false);
    console.log("response of removeAPI => ", response);
  };

  const handleOnClose = () => {
    closeModal();
  };

  return (
    <div className="container mx-auto w-full sm:w-3/4 max-w-500 bg-white rounded-lg min-h-115 p-5 text-center">
      <span className="text-3xl font-bold inline-block mb-1">
        Remove Member
      </span>
      <div className="flex flex-col mt-5">
        <span className="text-xl text-center">
          Hold up!! Are you sure you want to remove{" "}
          <span className="font-bold">{member.name}</span> from the Angel
          Alliance?
        </span>
      </div>
      <div className="w-full flex flex-cols-2 align-items-center justify-between gap-2 mt-10">
        <div>
          <button
            type="submit"
            className="w-32 h-10 rounded-lg px-3 py-1 font-semibold bg-orange shadow-md text-white hover:text-gray-600 font-heading"
            disabled={isSubmitting}
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
        <div>
          <button
            onClick={handleOnClose}
            className="w-32 h-10 rounded-lg px-3 py-1 font-semibold bg-orange shadow-md text-white hover:text-gray-600 font-heading"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveMemberModal;

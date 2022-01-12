import { useState } from "react";
import AddressSelector from "./AddressSelector";
import { useModalCloser } from "components/Modal/Modal";
import Action from "components/ActionButton/Action";

const UpdateMembersModal = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const closeModal = useModalCloser();
  const handleUpdate = () => {
    setSubmitting(true);
  };

  return (
    <div className="container mx-auto w-full sm:w-3/4 max-w-600 bg-white rounded-lg min-h-115 p-5 text-center">
      <span className="text-2xl font-semibold inline-block mb-1">
        Update Members
      </span>

      <AddressSelector></AddressSelector>
      <div className="w-full flex flex-cols-2 align-items-center justify-between gap-2">
        <div>
          <Action
            title="Submit"
            disabled={isSubmitting}
            classes="action-button"
            onClick={handleUpdate}
          />
        </div>
        <div>
          <Action
            title="Cancel"
            disabled={isSubmitting}
            classes="action-button"
            onClick={closeModal}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateMembersModal;

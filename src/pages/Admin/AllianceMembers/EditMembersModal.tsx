import { useState } from "react";
import AddressSelector from "./AddressSelector";
import { useModalCloser } from "components/Modal/Modal";

const EditMembersModal = ({ member }: any) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const closeModal = useModalCloser();
  const handleUpdate = () => {
    setSubmitting(true);
  };

  return (
    <div className="container mx-auto w-full sm:w-3/4 max-w-600 bg-white rounded-lg min-h-115 p-5 text-center">
      <span className="text-2xl font-semibold inline-block mb-1">
        {member.name}
      </span>

      <AddressSelector addressList={member.addresses} />
      <div className="w-full flex flex-cols-2 align-items-center justify-between gap-2">
        <div>
          <button
            type="submit"
            className="disabled:bg-grey-accent bg-orange hover:bg-angel-orange text-center w-48 h-12 rounded-2xl tracking-widest uppercase text-md font-bold text-white shadow-sm"
            disabled={isSubmitting}
            onClick={handleUpdate}
          >
            Submit
          </button>
        </div>
        <div>
          <button
            onClick={closeModal}
            className="disabled:bg-grey-accent bg-orange hover:bg-angel-orange text-center w-48 h-12 rounded-2xl tracking-widest uppercase text-md font-bold text-white shadow-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMembersModal;

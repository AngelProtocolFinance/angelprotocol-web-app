import { useState } from "react";
import AddressSelector from "./AddressSelector";

const UpdateMembersModal = () => {
  const [isSubmitting, setSubmitting] = useState(false);

  const handleUpdate = () => {};

  return (
    <div className="container mx-auto w-full sm:w-3/4 max-w-600 bg-white rounded-lg min-h-r15 p-5 text-center">
      <span className="text-2xl font-semibold inline-block mb-1">
        Update Members
      </span>

      <AddressSelector></AddressSelector>
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
          <button className="disabled:bg-grey-accent bg-orange hover:bg-angel-orange text-center w-48 h-12 rounded-2xl tracking-widest uppercase text-md font-bold text-white shadow-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateMembersModal;

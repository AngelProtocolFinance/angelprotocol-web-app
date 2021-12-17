import { useState } from "react";
import { useSetModal } from "components/Nodal/Nodal";
import "./endowments.css";
import { useRegistrarContract } from "services/terra/hooks";
import { MdOutlineClose } from "react-icons/md";

const updateOptions = ["approved", "frozen", "terminated"];

const statusMap: Record<string, number> = {
  approved: 1,
  frozen: 2,
  terminated: 3,
};

const UpdateEndowmentModal = ({
  status,
  address,
}: {
  status: string;
  address: string;
}) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const { hideModal } = useSetModal();
  const [value, setValue] = useState(status);
  const { contract: registrar, wallet } = useRegistrarContract();

  async function updateStatus() {
    const tx = await registrar.createUpdateEndowmentTx(
      statusMap[value],
      address
    );
    const response = await wallet?.post(tx);
    console.log(tx, response);
  }

  return (
    <div className="container mx-auto sm:w-3/4 max-w-600 bg-white rounded-lg min-h-115 p-10 text-center relative">
      <button
        onClick={hideModal}
        className="absolute right-2 top-2 text-angel-grey hover:text-black"
      >
        <MdOutlineClose size={30} />
      </button>
      <h1 className="text-xl font-semibold mb-1 uppercase mb-4">
        Update Endowment status
      </h1>
      <div>
        {updateOptions.map((value: string, i) => (
          <div className="flex items-center justify-start mr-4 mb-4" key={i}>
            <input
              id={value}
              type="radio"
              name="radio"
              className="hidden"
              defaultChecked={status.toLowerCase() === value}
              onClick={() => setValue(value)}
            />
            <label
              htmlFor={value}
              className="flex items-center cursor-pointer text-xl"
            >
              <span className="w-8 h-8 inline-block mr-2 rounded-full border border-grey flex-no-shrink capitalize" />
              {value}
            </label>
          </div>
        ))}
      </div>

      <div className="w-full flex align-items-center justify-start mt-5">
        <button
          type="submit"
          className="disabled:bg-grey-accent bg-angel-blue hover:bg-thin-blue focus:bg-thin-blue text-center w-full px-5 py-3 rounded-lg tracking-widest uppercase text-md font-semibold font-heading text-white shadow-sm focus:outline-none"
          disabled={isSubmitting}
          onClick={updateStatus}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UpdateEndowmentModal;

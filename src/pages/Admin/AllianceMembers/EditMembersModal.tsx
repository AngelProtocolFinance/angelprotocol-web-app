import { useState } from "react";
import AddressSelector from "./AddressSelector";
import { useModalCloser } from "components/Modal/Modal";

const EditMembersModal = ({ member }: any) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [wallet, setWallet] = useState("");
  const [error, setError] = useState("");
  const closeModal = useModalCloser();
  const handleUpdate = () => {
    setSubmitting(true);
  };
  const handleAdd = () => {
    if (wallet === "") {
      setError("Wallet is required");
    }
  };
  const handleOnChange = (event: any) => {
    const value = event.target.value;
    if (isValidWalletAddress(value)) {
      setError("");
    } else {
      setError("Invalid wallet address");
    }
    setWallet(value);
  };

  const isValidWalletAddress = (address: string) => {
    if (/^terra[a-z0-9]{39}$/.test(address)) {
      return true;
    }
    return false;
  };

  return (
    <div className="container mx-auto w-full sm:w-3/4 max-w-600 bg-white rounded-lg min-h-115 p-5 text-center">
      <span className="text-2xl font-semibold inline-block mb-1">
        {member.name}
      </span>
      <div className="flex flex-col mt-5">
        <label
          htmlFor="wallet"
          className="text-md text-gray-600 text-left font-bold mb-2 inline-block"
        >
          New Wallet Address
        </label>
        <div className="flex flex-row">
          <input
            type="text"
            className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 mr-2"
            placeholder="Wallet address"
            id="wallet"
            value={wallet}
            maxLength={44}
            onChange={handleOnChange}
          />
          <button
            className="disabled:bg-grey-accent bg-orange hover:bg-angel-orange text-center w-32 h-10 rounded-sm tracking-widest uppercase text-md font-bold text-white shadow-sm"
            disabled={!isValidWalletAddress(wallet)}
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
        {error !== "" && (
          <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
            {error}
          </p>
        )}
      </div>
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

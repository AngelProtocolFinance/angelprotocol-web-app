import { useModalCloser } from "components/Modal/Modal";
import { BsX } from "react-icons/bs";

const RevenueInfoModal = () => {
  //since this component is inside Modal, it has access to the Modal Context
  const closeModal = useModalCloser();
  return (
    <div className="bg-white-grey w-96 p-5 rounded-xl shadow-lg text-center">
      <div className="-mr-2 flex justify-end">
        <BsX onClick={closeModal} className="text-gray-300 text-2xl">
          X
        </BsX>
      </div>
      <p className="text-thin-blue my-3 text-base">
        This is the number used to set goals for sourcing reliable funding
        through returns on endowment [ex goal] = increase source of reliable
        funding from 5% to 20% over next 5 years
      </p>
      <button
        className="bg-thin-blue w-40 h-10 rounded-xl uppercase text-base font-bold text-white mt-3"
        onClick={closeModal}
      >
        GOT IT
      </button>
    </div>
  );
};

export default RevenueInfoModal;

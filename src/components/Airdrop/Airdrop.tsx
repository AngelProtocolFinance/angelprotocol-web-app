import { useSetModal } from "components/Nodal/Nodal";
import Details from "./Details";
import { FaParachuteBox } from "react-icons/fa";
export default function Airdrop() {
  const { showModal } = useSetModal();

  function showDetails() {
    showModal(Details, {});
  }

  return (
    <div>
      <button
        onClick={showDetails}
        className="w-full px-3 h-full border border-opacity-40 hover:bg-white hover:bg-opacity-10 rounded-md"
      >
        <FaParachuteBox className="text-lg" />
      </button>
    </div>
  );
}

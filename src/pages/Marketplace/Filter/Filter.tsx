import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import Modal from "components/Modal";
import { useSetter } from "store/accessors";
import { reset } from "slices/components/marketFilter";
import Countries from "./Countries";
import Designations from "./Designations";
import KYCFilter from "./KYCFilter";
import SDGs from "./SDGs";

export default function Filter({ classes = "" }: { classes?: string }) {
  const { closeModal } = useModalContext();
  const dispatch = useSetter();

  return (
    <Modal
      className={`${classes} fixed-center z-10 w-full max-w-[95vw] max-h-[95vh] sm:max-w-md overflow-y-auto scroller border border-prim bg-gray-l6 dark:bg-blue-d5 dark:text-white rounded`}
    >
      <div className="bg-orange-l6 dark:bg-blue-d7 flex items-center p-4 border-b border-prim">
        <h3 className="uppercase mr-auto">Filters</h3>
        <button
          type="button"
          title="Reset all filters to their default values."
          onClick={() => dispatch(reset())}
          className="text-gray-d1 dark:text-gray-l3 text-sm mr-4"
        >
          Clear Filters
        </button>
        <button onClick={closeModal} className="active:text-orange">
          <Icon type="Close" size={22} />
        </button>
      </div>

      <div className="px-2 py-4">
        <label className="font-bold text-xs font-heading uppercase block mb-2">
          Countries
        </label>
        <Countries />
      </div>

      <div className="px-2 divide-y divide-prim">
        <Designations />
        <KYCFilter />
        <SDGs />
      </div>
    </Modal>
  );
}

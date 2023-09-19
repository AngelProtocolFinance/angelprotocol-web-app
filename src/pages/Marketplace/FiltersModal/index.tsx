import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import Modal from "components/Modal";
import { useSetter } from "store/accessors";
import { clear } from "slices/components/marketFilter";
import Countries from "./Countries";
import Designations from "./Designations";
import KYCFilter from "./KYCFilter";
import SDGs from "./SDGs";

export default function Filters({ classes = "" }: { classes?: string }) {
  const dispatch = useSetter();
  const { closeModal } = useModalContext();

  return (
    <Modal className="fixed inset-0 sm:fixed-center z-20 grid sm:items-center w-full sm:max-w-lg h-full sm:h-fit sm:border border-prim sm:rounded bg-gray-l6 text-gray-d2 dark:bg-blue-d6 dark:text-white shadow-[0_0_60px_rgba(0,0,0,0.3)]">
      <Modal.Title
        as="h3"
        className="relative rounded-t w-full pl-4 px-4 sm:px-0 py-4 sm:py-6 bg-orange-l6 border-b border-prim font-black sm:font-bold sm:text-center text-xl text-orange sm:text-inherit uppercase sm:capitalize dark:bg-blue-d7"
      >
        Filters
        <button
          type="button"
          title="Remove all filter selections."
          onClick={() => dispatch(clear())}
          className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-d1 dark:text-gray-l3 text-xs mr-4"
        >
          Clear Filters
        </button>
      </Modal.Title>
      <div className="grid flex flex-col items-center gap-y-4 sm:gap-y-6 p-6 sm:p-8 dark:p-8 w-full sm:max-h-[492px] overflow-y-auto scroller">
        <Designations />
        <SDGs />
        <KYCFilter />
        <Countries />
      </div>
      <div className="flex flex-col items-center relative rounded-t w-full pl-4 px-4 sm:px-0 py-4 sm:py-6 bg-orange-l6 border-t border-prim font-black font-bold text-center text-xl dark:bg-blue-d7">
        <button className="btn-orange rounded-lg text-sm" onClick={closeModal}>
          Show results!
        </button>
      </div>
    </Modal>
  );
}

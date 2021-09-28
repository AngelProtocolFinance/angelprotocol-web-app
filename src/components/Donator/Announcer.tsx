import Modal from "components/Modal/Modal";
import Popup from "components/Donator/Popup";
import { useGetStatus } from "./Donator";
import Estimates from "./Estimates";
import { Steps } from "./types";
import Results from "./Results";
import Loader from "components/Loader/Loader";

export default function Announcer() {
  //since Announcer is inside <Formik/> - has access to formik props
  const status = useGetStatus();

  switch (status.step) {
    case Steps.error: {
      return (
        <Modal>
          <Popup message={status?.message} />
        </Modal>
      );
    }

    case Steps.confirm: {
      return (
        <Modal>
          <Popup message={status?.message}>
            <Estimates />
          </Popup>
        </Modal>
      );
    }
    case Steps.success: {
      return (
        <Modal>
          <Popup message={status?.message}>
            <Results />
          </Popup>
        </Modal>
      );
    }
    case Steps.waiting:
      return (
        <Modal>
          <Popup message={status?.message}>
            <Loader
              widthClass="w-4"
              gapClass="gap-2"
              bgColorClass="bg-angel-grey"
            />
          </Popup>
        </Modal>
      );

    default:
      return null;
  }
}

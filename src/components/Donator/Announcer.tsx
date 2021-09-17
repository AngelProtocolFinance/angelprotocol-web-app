import Modal from "components/Modal/Modal";
import Popup from "components/Donator/Popup";
import { useGetStatus } from "./Donator";
import Estimates from "./Estimates";
import { Steps } from "./types";
import Results from "./Results";

export default function Announcer() {
  //since Announcer is inside <Formik/> - has access to formik props
  const status = useGetStatus();

  switch (status.step) {
    case Steps.waiting:
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

    default:
      return null;
  }
}

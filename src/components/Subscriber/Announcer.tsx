import Modal from "components/Modal/Modal";
import Popup from "components/Subscriber/Popup";
import { useFormikContext } from "formik";
import { Status } from "./Subscriber";

export default function Announcer() {
  const { status }: { status?: Status } = useFormikContext();
  switch (status) {
    case Status.success:
      return (
        <Modal>
          <Popup message="Thank you for subscribing!" />
        </Modal>
      );
    case Status.failed:
      return (
        <Modal>
          <Popup message="Failed to subscribe." />
        </Modal>
      );
    default:
      return null;
  }
}

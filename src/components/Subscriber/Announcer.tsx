import Modal from "components/Modal/Modal";
import Popup from "components/Popup/Popup";
import { Handler, Status } from "./Subscriber";

interface Props {
  status: Status;
  resetForm: Handler;
}

export default function Announcer(props: Props) {
  switch (props.status) {
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

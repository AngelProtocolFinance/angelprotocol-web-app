import Modal from "components/Modal/Modal";
import Popup from "components/Popup/Popup";
import { useFormikContext } from "formik";
import { Status } from "./Subscriber";

interface Props {
  status: Status;
}

export default function Announcer(props: Props) {
  const { resetForm } = useFormikContext();
  switch (props.status) {
    case Status.success:
      return (
        <Modal>
          <Popup message="Thank you for subscribing!" cleanup={resetForm} />
        </Modal>
      );
    case Status.failed:
      return (
        <Modal>
          <Popup message="Failed to subscribe." cleanup={resetForm} />
        </Modal>
      );
    default:
      return null;
  }
}

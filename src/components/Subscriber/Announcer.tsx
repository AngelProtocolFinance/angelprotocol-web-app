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
        <Modal
          render={(modalCloser) => (
            <Popup
              message="Thank you for subscribing!"
              acknowledge={() => {
                props.resetForm();
                modalCloser();
              }}
            />
          )}
        />
      );
    case Status.failed:
      return (
        <Modal
          render={(modalCloser) => (
            <Popup
              message="Failed to subscribe."
              acknowledge={() => {
                props.resetForm();
                modalCloser();
              }}
            />
          )}
        />
      );
    default:
      return null;
  }
}

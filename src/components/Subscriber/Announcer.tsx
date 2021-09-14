import Modal from "components/Modal/Modal";
import SuccessPopup from "./SuccessPopup";
import ErrorPopup from "./ErrorPopup";

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
          render={(closeModal) => (
            <SuccessPopup
              clickHandler={() => {
                props.resetForm();
                closeModal();
              }}
            />
          )}
        />
      );
    case Status.failed:
      return (
        <Modal
          render={(closeModal) => (
            <ErrorPopup
              clickHandler={() => {
                props.resetForm();
                closeModal();
              }}
            />
          )}
        />
      );
    default:
      return null;
  }
}

import Modal from "components/Modal/Modal";
import Popup from "components/Popup/Popup";
import { Result, ResultSetter, Status } from "./types";

interface Props {
  result: Result;
  resetResult: ResultSetter;
}

export default function Announcer(props: Props) {
  switch (props.result.status) {
    case Status.success:
      return (
        <Modal
          render={(modalCloser) => (
            <Popup
              type="success"
              heading="Success"
              message={props.result.message}
              acknowledge={() => {
                props.resetResult({ status: Status.initial, message: "" });
                modalCloser();
              }}
            />
          )}
        />
      );
    case Status.error:
      return (
        <Modal
          render={(modalCloser) => (
            <Popup
              type="error"
              heading="Error"
              message={props.result.message}
              acknowledge={() => {
                props.resetResult({ status: Status.initial, message: "" });
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

import Modal from "components/Modal/Modal";
import Popup from "components/Popup/Popup";
import { Result, ResultSetter, Status } from "./types";

interface Props {
  result: Result;
  resetResult: ResultSetter;
}

export default function Announcer(props: Props) {
  if (props.result.status === Status.initial) {
    return null;
  } else {
    return (
      <Modal
        render={(modalCloser) => (
          <Popup
            message={props.result.message}
            acknowledge={() => {
              props.resetResult({ status: Status.initial, message: "" });
              modalCloser();
            }}
          />
        )}
      />
    );
  }
}

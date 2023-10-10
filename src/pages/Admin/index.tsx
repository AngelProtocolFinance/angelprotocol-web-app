import ModalContext from "contexts/ModalContext";
import Charity from "./Charity";
import { Context } from "./Context";

export default function Admin() {
  return (
    <Context>
      <ModalContext>
        <Charity />;
      </ModalContext>
    </Context>
  );
}

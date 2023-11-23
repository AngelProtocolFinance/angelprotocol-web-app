import withAuth from "contexts/Auth";
import ModalContext from "contexts/ModalContext";
import Charity from "./Charity";
import { Context } from "./Context";

export default withAuth(function Admin() {
  return (
    <Context>
      <ModalContext>
        <Charity />
      </ModalContext>
    </Context>
  );
});

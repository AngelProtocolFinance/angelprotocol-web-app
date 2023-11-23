import ModalContext from "contexts/ModalContext";
import withAuth from "components/Auth";
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

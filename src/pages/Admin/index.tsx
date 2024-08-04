import withAuth from "contexts/Auth";
import ModalContext from "contexts/ModalContext";
import Charity from "./Charity";
import { Context } from "./Context";

export const Component = withAuth(function Admin({ user }) {
  return (
    <Context user={user}>
      <ModalContext>
        <Charity />
      </ModalContext>
    </Context>
  );
});

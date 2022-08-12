import ModalContext from "contexts/ModalContext";
import { Guard } from "./Guard";
import Nav from "./Nav";
import Views from "./Views";

export default function Admin() {
  return (
    <Guard>
      {/**modals in this scope can access AdminGuard context value */}
      <ModalContext backdropClasses="z-10 fixed inset-0 bg-black/50">
        <div className="padded-container min-h-3/4 grid grid-rows-a1 pb-4 gap-2">
          <Nav />
          <Views />
        </div>
      </ModalContext>
    </Guard>
  );
}

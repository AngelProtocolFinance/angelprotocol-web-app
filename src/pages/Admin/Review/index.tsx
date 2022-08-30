import ModalContext from "contexts/ModalContext";
import Nav from "./Nav";
import Views from "./Views";

export default function Review() {
  return (
    <ModalContext backdropClasses="z-10 fixed inset-0 bg-black/50">
      <div className="padded-container grid grid-rows-[auto_1fr] pb-4 gap-2">
        <Nav />
        <Views />
      </div>
    </ModalContext>
  );
}

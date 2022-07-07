import ModalContext from "contexts/ModalContext";
import AppFoot from "./AppFoot";
import DappHead from "./DappHead";
import Views from "./Views";

export default function App() {
  return (
    <div className="grid grid-rows-a1a bg-gradient-to-b from-blue-accent to-black-blue relative pt-6">
      <p className="transition-shadow fixed z-20 top-0 inset-x-0 font-heading font-bold bg-angel-orange w-full p-2 text-center text-angel-grey text-xs">
        Please note: Donations are currently disabled. V2 coming soon!
      </p>
      <ModalContext backdropClasses="z-10 fixed inset-0 bg-black/50">
        <DappHead />
        <Views />
      </ModalContext>
      <AppFoot />
    </div>
  );
}

import DonateForm from "components/DonateForm/DonateForm";
import Donater from "components/Donater/Donater";
import AppHead from "components/Headers/AppHead";
import Sender from "./Sender";

export default function Test() {
  return (
    <div className="pb-16 grid grid-rows-a1">
      <AppHead />
      <div className="grid place-items-center">
        <Sender />
        <Donater to="tca">
          <DonateForm />
        </Donater>
      </div>
    </div>
  );
}

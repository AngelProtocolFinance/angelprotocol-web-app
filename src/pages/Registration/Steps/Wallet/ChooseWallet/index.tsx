import { steps } from "pages/Registration/routes";
import { BtnSec } from "components/registration";
import KeplrConnector from "./KeplrConnector";
import Title from "./Title";

export default function ChooseWallet() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-full w-full">
      <Title />
      <KeplrConnector />
      <BtnSec as="link" to={`../${steps.profile}`}>
        Back
      </BtnSec>
    </div>
  );
}

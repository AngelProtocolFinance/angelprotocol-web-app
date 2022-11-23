import { BtnSec } from "components/registration";
import { steps } from "../../../routes";
import { useRegState } from "../../StepGuard";
import KeplrConnector from "./KeplrConnector";

export default function ChooseWallet() {
  const { data } = useRegState<3>();
  return (
    <div className="w-full grid">
      <h3 className="text-lg font-bold">Choose a wallet</h3>
      <p className="mb-8 text-sm text-gray-d1 dark:text-gray mt-2">
        We recommend using a new wallet.
      </p>
      <KeplrConnector />
      <BtnSec
        as="link"
        to={`../${steps.doc}`}
        state={data.init}
        className="mt-8 max-w-[8rem]"
      >
        Back
      </BtnSec>
    </div>
  );
}

import { steps } from "pages/Registration/routes";
import Icon from "components/Icon";
import { BtnPrim, BtnSec } from "components/registration";
import { useRegState } from "../StepGuard";

export default function RegisteredWallet(props: {
  onChange: () => void;
  address: string;
}) {
  const { data } = useRegState<3>();
  return (
    <div className="grid h-full w-full justify-items-center">
      <div className="flex flex-col items-center gap-4 mb-4">
        <Icon type="Check" size={60} />
      </div>
      <p className="text-xl font-extrabold font-heading uppercase mb-2">
        Your wallet is registered
      </p>
      <p className="uppercase text-sm">your wallet address is</p>
      <p className="font-mono my-2 p-2 border-b border-white/20">
        {props.address}
      </p>

      <div className="flex gap-4 items-center">
        <BtnSec onClick={props.onChange}>change wallet</BtnSec>
        <BtnPrim as="link" to={`../${steps.summary}`} state={data.init}>
          Continue
        </BtnPrim>
      </div>
    </div>
  );
}

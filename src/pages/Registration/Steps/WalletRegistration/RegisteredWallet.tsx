import { steps } from "pages/Registration/routes";
import { useRegState } from "services/aws/registration/StepGuard";
import Icon from "components/Icon";
import { BtnPrim, BtnSec } from "components/registration";

export default function RegisteredWallet(props: {
  onChange: () => void;
  address: string;
}) {
  const { data } = useRegState<4>();
  return (
    <div className="flex flex-col h-full w-full items-center">
      <div className="flex flex-col items-center gap-4 mb-4">
        <Icon type="Check" size={60} />
      </div>
      <div>
        <p className="text-xl font-extrabold font-heading uppercase mb-2">
          Your wallet is registered
        </p>
        <p className="uppercase text-sm">your wallet address is</p>
        <p className="font-mono my-2 p-2 border-b border-white/20">
          {props.address}
        </p>
      </div>
      <BtnSec onClick={props.onChange}>change wallet</BtnSec>
      <BtnPrim as="link" to={`../${steps.summary}`} state={data.init}>
        Continue
      </BtnPrim>
    </div>
  );
}

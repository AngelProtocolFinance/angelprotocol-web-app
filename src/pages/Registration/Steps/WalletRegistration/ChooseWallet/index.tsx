import { steps } from "pages/Registration/routes";
import { useRegState } from "services/aws/registration/StepGuard";
import { BtnSec } from "components/registration";
import KeplrConnector from "./KeplrConnector";
import Title from "./Title";

export default function ChooseWallet() {
  const { data } = useRegState<4>();
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-full w-full">
      <Title />
      <KeplrConnector />
      <BtnSec as="link" to={`../${steps.profile}`} state={data.init}>
        Back
      </BtnSec>
    </div>
  );
}

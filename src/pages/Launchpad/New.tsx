import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Network } from "slices/launchpad/types";
import Status from "components/Status";
import { useLaunchpad } from "slices/launchpad";
import NetworkIcon from "./common/NetworkIcon";
import { routes } from "./constants";

export default function New({ classes = "" }) {
  const { state } = useLocation();
  const step = state as number | null;
  return (
    <div
      className={`grid content-start justify-items-center gap-8 padded-container w-full max-w-lg ${classes}`}
    >
      <h3 className="text-3xl font-bold text-center mb-4 break-words">
        {step ? "Change Network" : "Select Network"}
      </h3>

      {step && step > 1 /** only show warning if user made some progress */ ? (
        <Status icon="Info" classes="-mt-10 text-red text-sm">
          This will reset your current progress
        </Status>
      ) : null}

      <div className="grid sm:flex gap-2">
        <NetworkBtn network="juno" />
        <NetworkBtn network="polygon" />
      </div>

      {step ? (
        <Link
          to={`../${routes.steps}/${step}`}
          className="btn-orange px-8 py-2 text-sm"
        >
          back
        </Link>
      ) : null}
    </div>
  );
}

type Props = { network: Network };
function NetworkBtn({ network }: Props) {
  const navigate = useNavigate();
  const { reset } = useLaunchpad(1);

  const start = () => {
    reset(network);
    navigate(`../${routes.steps}`);
  };

  return (
    <button
      className="btn-outline w-full gap-2 sm:min-w-[10rem] justify-start px-6"
      onClick={start}
    >
      <NetworkIcon classes="w-6 h-6 object-contain" network={network} />
      <span className="uppercase">{network}</span>
    </button>
  );
}

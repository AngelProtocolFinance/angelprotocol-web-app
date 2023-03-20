import { useNavigate } from "react-router-dom";
import { Network } from "slices/launchpad/types";
import junoIcon from "assets/icons/currencies/juno.svg";
import polygonIcon from "assets/icons/currencies/matic.svg";
import { useLaunchpad } from "slices/launchpad";
import { routes } from "./constants";

export default function New({ classes = "" }) {
  return (
    <div
      className={`grid content-start justify-items-center gap-8 padded-container w-full max-w-lg ${classes}`}
    >
      <h3 className="text-3xl font-bold text-center mb-4 break-words">
        Select network
      </h3>

      <div className="grid sm:flex gap-2">
        <NetworkBtn network="juno" />
        <NetworkBtn network="polygon" />
      </div>
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
      <img
        src={network === "juno" ? junoIcon : polygonIcon}
        alt=""
        className="w-6 h-6 object-contain"
      />
      <span className="uppercase">{network}</span>
    </button>
  );
}

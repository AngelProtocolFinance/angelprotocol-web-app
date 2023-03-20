import { useNavigate } from "react-router-dom";
import { Network } from "slices/launchpad/types";
import { useLaunchpad } from "slices/launchpad";
import { routes } from "./constants";

export default function NetworkOption({ classes = "" }) {
  const navigate = useNavigate();
  const { reset } = useLaunchpad(1);

  const start = (network: Network) => () => {
    reset(network);
    navigate(`../${routes.steps}`);
  };

  return (
    <div
      className={`grid content-start justify-items-center gap-8 padded-container w-full max-w-lg ${classes}`}
    >
      <h3 className="text-3xl font-bold text-center mb-4 break-words">
        Select network
      </h3>

      <button className="btn btn-outline" onClick={start("polygon")}>
        <img src="" />
        <span>Juno</span>
      </button>
      <button className="btn btn-outline" onClick={start("juno")}>
        <img src="" />
        <span>Polygon</span>
      </button>
    </div>
  );
}

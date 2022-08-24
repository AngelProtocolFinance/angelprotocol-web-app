import { Airdrops } from "types/server/aws";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import Transactor, { TxProps } from "components/Transactor";
import Claimables from "./Claimables";

export default function Airdrop() {
  const { showModal } = useModalContext();
  const airdrops: Airdrops = []; //FUTURE: reenable when multicall for terra v2.0 is available

  if (airdrops.length <= 0) {
    return null;
  }

  return (
    <div>
      <button
        onClick={() => {
          showModal<TxProps<{ airdrops: Airdrops }>>(Transactor, {
            Content: Claimables,
            contentProps: { airdrops },
          });
        }}
        className="w-full px-3 h-full border border-white/40 hover:bg-white/10 rounded-md"
      >
        <Icon type="Parachute" className="text-lg text-white" />
      </button>
    </div>
  );
}

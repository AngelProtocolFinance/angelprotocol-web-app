import { NativeToken } from "types/server/aws";
import { useModalContext } from "contexts/ModalContext";
import { ProviderId } from "contexts/WalletContext/types";
import addNetworkAndSwitch from "helpers/addNetworkAndSwitch";
import WalletPrompt from "../WalletPrompt";

export default function NetworkOption({
  providerId,
  ...coin
}: NativeToken & { providerId: ProviderId }) {
  const { showModal } = useModalContext();
  async function handleNetworkChange() {
    try {
      await addNetworkAndSwitch(coin, providerId);
    } catch (err) {
      console.error(err);
      //render appropriate prompt
      showModal(WalletPrompt, {
        message: "Unknown error: Kindly switch your wallet network manually",
      });
    }
  }
  return (
    <button
      onClick={handleNetworkChange}
      className="flex items-center hover:bg-angel-blue/10 active:bg-angel-blue/30 gap-2 p-2 mt-2 last:mb-2 mx-2 rounded-md border border-angel-blue/30"
    >
      <img src={coin.logo} alt="" className="w-6 h-6 object-contain" />
      <p className="text-angel-grey text-sm">{coin.chainName}</p>
    </button>
  );
}

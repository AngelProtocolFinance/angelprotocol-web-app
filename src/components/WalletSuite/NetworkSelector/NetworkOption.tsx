import { useModalContext } from "contexts/ModalContext";
import { NativeToken, ProviderId } from "contexts/WalletContext/types";
import switchNetwork from "helpers/switchNetwork";
import WalletPrompt from "../WalletPrompt";

export default function NetworkOption({
  providerId,
  ...coin
}: NativeToken & { providerId: ProviderId }) {
  const { showModal } = useModalContext();
  async function handleNetworkChange() {
    try {
      await switchNetwork(coin, providerId);
    } catch (err) {
      showModal(WalletPrompt, {
        message: "This network might not be supported by your wallet",
      });
      //render appropriate prompt
      console.error(err);
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

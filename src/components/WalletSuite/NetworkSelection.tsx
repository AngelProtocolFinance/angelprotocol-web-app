import {
  useGetWallet,
  useSetWallet,
} from "contexts/WalletContext/WalletContext";
import { NativeToken, ProviderId } from "contexts/WalletContext/types";
import Backdrop from "components/Backdrop";
import Icon from "components/Icon";
import switchNetwork from "helpers/switchNetwork";

export default function NetworkSelection(props: { closeHandler: () => void }) {
  const { coins, providerId } = useGetWallet();
  const { disconnect } = useSetWallet();

  return (
    <>
      <Backdrop
        classes="z-10 fixed inset-0"
        customCloseHandler={props.closeHandler}
      />
      <div className="w-max z-50 grid content-start absolute top-full mt-2 bg-white w-full right-0 rounded-md overflow-hidden shadow-lg">
        <div className="bg-angel-grey flex justify-end">
          <button className="text-white p-1 pb-0" onClick={props.closeHandler}>
            <Icon type="Close" />
          </button>
        </div>
        <p className="bg-angel-grey text-white-grey text-sm p-2 pt-0">
          Please select network
        </p>
        {coins.map((coin) => (
          <NetworkOption
            key={coin.chainId}
            {...coin}
            providerId={
              providerId! /**this component is rendered only when a provider is connected */
            }
          />
        ))}
        <button
          onClick={disconnect}
          className="uppercase text-sm bg-angel-orange hover:text-angel-grey p-2 mt-2 text-white"
        >
          disconnect
        </button>
      </div>
    </>
  );
}

function NetworkOption({
  providerId,
  ...coin
}: NativeToken & { providerId: ProviderId }) {
  async function handleNetworkChange() {
    try {
      await switchNetwork(coin, providerId);
    } catch (err) {
      //render appropriate prompt
      console.error(err);
    }
  }
  return (
    <button
      onClick={handleNetworkChange}
      className="flex items-center hover:bg-angel-blue/10 active:bg-angel-blue/30 gap-2 p-2 mt-2 mx-2 rounded-md border border-angel-blue/30"
    >
      <img src={coin.logo} alt="" className="w-6 h-6 object-contain" />
      <p className="text-angel-grey text-sm">{coin.chainName}</p>
    </button>
  );
}

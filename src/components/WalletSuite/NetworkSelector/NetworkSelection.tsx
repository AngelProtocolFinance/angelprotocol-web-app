import ModalContext from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Backdrop from "components/Backdrop";
import Icon from "components/Icon";
import NetworkOption from "./NetworkOption";

export default function NetworkSelection(props: { closeHandler: () => void }) {
  const { coins, providerId } = useGetWallet();

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
        <ModalContext backdropClasses="z-10 absolute inset-0 bg-black/50">
          {coins.map((coin) => (
            <NetworkOption
              key={coin.chainId}
              {...coin}
              providerId={
                providerId! /**this component is rendered only when a provider is connected */
              }
            />
          ))}
        </ModalContext>
      </div>
    </>
  );
}

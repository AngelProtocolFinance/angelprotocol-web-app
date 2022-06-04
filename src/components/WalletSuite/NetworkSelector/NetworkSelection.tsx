import ModalContext from "contexts/ModalContext";
import {
  useGetWallet,
  useSetWallet,
} from "contexts/WalletContext/WalletContext";
import isTerraProvider from "contexts/WalletContext/helpers/isTerraProvider";
import Backdrop from "components/Backdrop";
import Icon from "components/Icon";
import NetworkOption from "./NetworkOption";

export default function NetworkSelection(props: { closeHandler: () => void }) {
  const { coins, providerId } = useGetWallet();
  const { disconnect } = useSetWallet();

  const isTerra = providerId && isTerraProvider(providerId);

  if (isTerra) {
    return (
      <>
        <Backdrop
          classes="z-10 fixed inset-0"
          customCloseHandler={props.closeHandler}
        />
        <div className="w-max z-50 grid content-start absolute top-full mt-2 bg-white w-full right-0 rounded-md overflow-hidden shadow-lg">
          <button
            onClick={disconnect}
            className="uppercase text-xs bg-angel-orange hover:text-angel-grey p-2 text-white"
          >
            disconnect
          </button>
        </div>
      </>
    );
  }

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
          {coins
            .slice(1) /**don't include display coin on unsupported case*/
            .map((coin) => (
              <NetworkOption
                key={coin.chainId}
                {...coin}
                providerId={
                  providerId! /**this component is rendered only when a provider is connected */
                }
              />
            ))}
        </ModalContext>
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

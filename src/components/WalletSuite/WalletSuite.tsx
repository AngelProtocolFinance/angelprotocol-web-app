import { IoWalletSharp } from "react-icons/io5";
import Display from "./Display";
import { useCallback, useEffect, useRef, useState } from "react";
import ConnectOptions from "./ConnectOptions";
import { useGetter } from "store/accessors";
import { Providers } from "services/wallet/types";
import useWalletUpdator from "./useWalletUpdator";
import useKeyPress from "hooks/useKeyPress";
import useBackdropDismiss from "./useBackdropDismiss";

export default function WalletSuite() {
  const provider = useGetter((state) => state.provider);
  const escKeyPressed = useKeyPress("Escape");
  const ref = useRef<HTMLDivElement>();

  useWalletUpdator(provider.active);

  const [connectOptionsShown, setConnectOptionsShown] = useState(false);
  const toggleConnectOptions = () => setConnectOptionsShown((p) => !p);
  const hideConnectOptions = () => setConnectOptionsShown(false);
  const dismissHandler = useBackdropDismiss(hideConnectOptions);

  const isProviderActive = provider.active !== Providers.none;
  //close modal after connecting
  useEffect(() => {
    isProviderActive && setConnectOptionsShown(false);
    //eslint-disable-next-line
  }, [isProviderActive]);

  useEffect(() => {
    if (escKeyPressed && connectOptionsShown) {
      hideConnectOptions();
    }
    //eslint-disable-next-line
  }, [escKeyPressed, connectOptionsShown]);

  const handleRef = useCallback(
    (node) => {
      if (node !== null) {
        ref.current = node;
        dismissHandler(ref);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div
      ref={handleRef}
      className="relative border border-opacity-40 hover:bg-white hover:bg-opacity-10 rounded-md"
    >
      {!isProviderActive && (
        <button
          className="flex py-2 px-3 items-center text-white  "
          disabled={provider.isSwitching}
          onClick={toggleConnectOptions}
        >
          <IoWalletSharp className="text-white text-xl mr-2" />
          <span>{provider.isSwitching ? "Loading" : "Connect"}</span>
        </button>
      )}
      {isProviderActive && <Display />}
      {connectOptionsShown && (
        <ConnectOptions closeHandler={hideConnectOptions} />
      )}
    </div>
  );
}

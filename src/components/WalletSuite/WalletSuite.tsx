import Icon from "components/Icons/Icons";
import useKeyPress from "hooks/useKeyPress";
import { useCallback, useEffect, useRef, useState } from "react";
import { Providers } from "services/wallet/types";
import { useGetter } from "store/accessors";
import ConnectOptions from "./ConnectOptions";
import Display from "./Display";
import useBackdropDismiss from "./useBackdropDismiss";
import useWalletUpdator from "./useWalletUpdator";

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
      className="relative border border-white/40 hover:bg-white/10 rounded-md"
    >
      {!isProviderActive && (
        <button
          className="flex py-2 px-3 items-center text-white  "
          disabled={provider.isSwitching}
          onClick={toggleConnectOptions}
        >
          <Icon type="Wallet" className="text-white text-xl mr-2" />
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

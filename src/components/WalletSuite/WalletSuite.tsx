import useKeyPress from "hooks/useKeyPress";
import { WalletSuiteContext } from "providers/WalletSuiteProvider";
import { useCallback, useContext, useEffect, useRef } from "react";
import { IoWalletSharp } from "react-icons/io5";
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

  const { connectOptionsShown, setConnectOptionsShown } =
    useContext(WalletSuiteContext);

  const toggleConnectOptions = () => setConnectOptionsShown((p) => !p);
  const hideConnectOptions = useCallback(
    () => setConnectOptionsShown(false),
    [setConnectOptionsShown]
  );
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
  }, [escKeyPressed, connectOptionsShown, hideConnectOptions]);

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

import { useWallet, ConnectType } from "@terra-money/wallet-provider";
type Props = {
  type: ConnectType;
};

export default function Installer(props: Props) {
  const { availableInstallTypes, install } = useWallet();
  const isInstallable = availableInstallTypes.includes(props.type);

  function handleInstall() {
    install(props.type);
  }

  if (isInstallable) {
    return (
      <button
        onClick={handleInstall}
        className={`mt-2 uppercase text-xs bg-white bg-opacity-50 text-white px-3 py-1 rounded-sm`}
      >
        Install
      </button>
    );
  } else {
    return null;
  }
}

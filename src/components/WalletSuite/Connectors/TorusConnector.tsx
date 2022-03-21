import ConnectButton from "./ConnectButton";
import torusIcon from "assets/icons/wallets/torus.png";

export default function TorusConnector() {
  // const { isLoading, privateKey, login } = useOpenLogin();

  return (
    <ConnectButton
      onClick={() => {
        /**login */
      }}
      _icon={torusIcon}
      disabled={false}
    >
      Torus
    </ConnectButton>
  );
}

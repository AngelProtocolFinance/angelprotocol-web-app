import ConnectButton from "./ConnectButton";
import torusIcon from "assets/icons/wallets/torus.png";

export default function TorusConnector() {
  return (
    <ConnectButton
      onClick={() => console.log("torus singin")}
      _icon={torusIcon}
      disabled={false}
    >
      Torus
    </ConnectButton>
  );
}

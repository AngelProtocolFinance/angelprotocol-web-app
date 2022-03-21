import ConnectButton from "./ConnectButton";
import torusIcon from "assets/icons/wallets/torus.png";
import { useContext } from "react";
import { WalletSuiteContext } from "providers/WalletSuiteProvider";

export default function TorusConnector() {
  const {
    torus: { isLoading, privateKey, login },
  } = useContext(WalletSuiteContext);

  return (
    <ConnectButton onClick={() => login()} _icon={torusIcon} disabled={false}>
      Torus
    </ConnectButton>
  );
}

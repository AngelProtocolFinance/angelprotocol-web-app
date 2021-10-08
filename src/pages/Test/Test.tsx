import AppHead from "components/Headers/AppHead";
import Connectors from "components/WalletSuite/Connectors";
import Toolkit from "components/WalletSuite/Toolkit";
import WalletSuite from "components/WalletSuite/WalletSuite";

export default function Test() {
  return (
    <div className="grid content-start place-items-center">
      <AppHead />
      <WalletSuite>
        <Toolkit />
        <Connectors />
      </WalletSuite>
    </div>
  );
}

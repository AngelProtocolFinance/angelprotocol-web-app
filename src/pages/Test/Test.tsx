import AppHead from "components/Headers/AppHead";
import Connectors from "components/WalletSuite/Connectors";
import Toolkit from "components/WalletSuite/Toolkit";
import WalletSuite from "components/WalletSuite/WalletSuite";

/**
 * todo:
 * 1. when Suite loads, collect all wallet status
 * 2. set initial activeWallet to a single connected wallet
 */

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

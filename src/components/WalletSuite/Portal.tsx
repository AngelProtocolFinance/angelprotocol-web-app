import { Link } from "react-router-dom";
import useWalletContext from "hooks/useWalletContext";
import { app, site } from "constants/routes";

export default function Portal() {
  const { wallet } = useWalletContext();
<<<<<<< HEAD
=======
  const isTestNet = wallet?.network.chainID === chainIDs.terra_test;
  //on testnet --> url resolves to endpoint/endowments/testnet
  const { data, isLoading } = useLookupQuery(isTestNet);

  const endowmentAddr = data?.[wallet?.address || ""];
  // if (isLoading || isFetching) {
  //   //subtle skeleton
  //   return (
  //     <div className="ml-2 animate-pulse bg-angel-blue/20 w-28 h-6 rounded-md"></div>
  //   );
  // };
>>>>>>> master
  return (
    <Link
      to={`${site.app}/${app.donations}/${wallet?.address}`}
      className="text-angel-blue hover:text-angel-orange text-xs font-bold font-heading pl-2 mt-2"
    >
      MY DONATIONS
    </Link>
  );
}

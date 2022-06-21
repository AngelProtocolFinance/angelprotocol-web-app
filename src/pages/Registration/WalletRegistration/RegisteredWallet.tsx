import { IconContext } from "react-icons";
import { BsCheck2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  updateRegQueryData,
  useRegistrationState,
} from "services/aws/registration";
import { useSetter } from "store/accessors";
import { appRoutes, siteRoutes } from "constants/routes";
import { Button } from "../common";
import routes from "../routes";

export default function RegisteredWallet() {
  const { data } = useRegistrationState("");
  const charity = data!; //handled by guard

  const dispatch = useSetter();

  function clearCachedWallet() {
    /**refreshing the page refetches registration and updates cache with wallet in db */
    dispatch(
      updateRegQueryData("registration", "", (charity) => {
        charity.Metadata.TerraWallet = "";
      })
    );
  }

  return (
    <div className="flex flex-col h-full items-center">
      <div className="flex flex-col items-center gap-4 mb-4">
        <IconContext.Provider value={{ className: "text-7xl" }}>
          <BsCheck2 />
        </IconContext.Provider>
      </div>
      <div>
        <p className="text-xl font-extrabold font-heading uppercase mb-2">
          Your wallet is registered
        </p>
        <p className="uppercase text-sm">your wallet address is</p>
        <p className="font-mono my-2 p-2 border-b border-white/20">
          {charity.Metadata.TerraWallet}
        </p>
      </div>
      {/**TODO: must be disabled at some registration point */}
      <Button
        onClick={clearCachedWallet}
        className="uppercase font-heading text-xs bg-angel-orange px-2 py-1"
      >
        change wallet
      </Button>
      <Link
        to={`${siteRoutes.app}/${appRoutes.register}/${routes.dashboard}`}
        className="flex justify-center items-center w-80 h-10 mt-8 bg-green-400 rounded-xl uppercase font-bold text-white"
      >
        Back to registration dashboard
      </Link>
    </div>
  );
}

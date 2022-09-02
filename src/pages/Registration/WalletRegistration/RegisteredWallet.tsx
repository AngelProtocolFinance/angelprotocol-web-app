import { IconContext } from "react-icons";
import { BsCheck2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  updateRegQueryData,
  useRegistrationQuery,
} from "services/aws/registration";
import { useSetter } from "store/accessors";
import { appRoutes } from "constants/routes";
import { Button } from "../common";
import routes from "../routes";

export default function RegisteredWallet() {
  const { charity } = useRegistrationQuery();

  const dispatch = useSetter();

  function clearCachedWallet() {
    /**refreshing the page refetches registration and updates cache with wallet in db */
    dispatch(
      updateRegQueryData("registration", "", (charity) => {
        charity.Metadata.JunoWallet = "";
      })
    );
  }

  const continueUrl = charity.ContactPerson.EmailVerified
    ? `${appRoutes.register}/${routes.dashboard}`
    : `${appRoutes.register}/${routes.confirmEmail}`;

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
          {charity.Metadata.JunoWallet}
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
        to={continueUrl}
        className="flex justify-center items-center w-80 h-10 mt-8 bg-green-400 rounded-xl uppercase font-bold text-white"
      >
        Continue
      </Link>
    </div>
  );
}

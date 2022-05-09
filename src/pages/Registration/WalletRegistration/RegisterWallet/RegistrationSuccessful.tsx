import { IconContext } from "react-icons";
import { BsCheck2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { app, site } from "constants/routes";
import routes from "../../routes";

type Props = { walletAddress: string };

export default function RegistrationSuccessful({ walletAddress }: Props) {
  return (
    <div className="flex flex-col h-full items-center">
      <div className="flex flex-col items-center gap-4 mb-10">
        <IconContext.Provider value={{ className: "text-7xl" }}>
          <BsCheck2 />
        </IconContext.Provider>
        <p className="text-3xl font-bold uppercase">success!</p>
      </div>
      <div>
        <p>Thanks for registering your wallet:</p>
        <p>your address is</p>
        <p className="font-bold">{walletAddress}</p>
      </div>
      <Link
        to={`${site.app}/${app.register}/${routes.dashboard}`}
        className="flex justify-center items-center w-80 h-10 mt-8 bg-green-400 rounded-xl uppercase font-bold text-white"
      >
        Back to registration dashboard
      </Link>
    </div>
  );
}

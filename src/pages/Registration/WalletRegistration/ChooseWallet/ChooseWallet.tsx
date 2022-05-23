import { Link, useNavigate } from "react-router-dom";
import { Button } from "pages/Registration/common";
import { appRoutes, siteRoutes } from "constants/routes";
import { default as registerRoutes } from "../../routes";
import routes from "../routes";
import Title from "./Title";
import Web3Auth from "./Web3Auth";

export default function ChooseWallet() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 items-center">
      <Title />
      <Web3Auth
        onLogin={() => {
          alert("web 3 auth");
        }}
      />
      <Link
        to={`${siteRoutes.app}/${appRoutes.register}/${registerRoutes.wallet}/${routes.submit}`}
        className="uppercase text-bright-blue text-sm hover:underline mb-5 lg:mb-0"
      >
        Click here if you have a Terra wallet
      </Link>
      <Button
        className="bg-green-400 w-80 h-10"
        onClick={() =>
          navigate(
            `${siteRoutes.app}/${appRoutes.register}/${registerRoutes.dashboard}`
          )
        }
      >
        Back to registration dashboard
      </Button>
    </div>
  );
}

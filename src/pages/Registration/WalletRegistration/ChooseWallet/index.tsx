import { useNavigate } from "react-router-dom";
import { Button } from "pages/Registration/common";
import { appRoutes } from "constants/routes";
import { default as registerRoutes } from "../../routes";
import KeplrConnector from "./KeplrConnector";
import Title from "./Title";

export default function ChooseWallet() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5 items-center">
      <Title />
      <KeplrConnector />
      <Button
        className="bg-green-400 w-80 h-10"
        onClick={() =>
          navigate(`${appRoutes.register}/${registerRoutes.dashboard}`)
        }
      >
        Back to registration dashboard
      </Button>
    </div>
  );
}

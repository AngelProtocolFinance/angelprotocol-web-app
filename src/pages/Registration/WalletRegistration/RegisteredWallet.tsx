import { IconContext } from "react-icons";
import { BsCheck2 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useRegistrationQuery } from "services/aws/registration";
import { appRoutes } from "constants/routes";
import { Button } from "../common";
import routes from "../routes";

type Props = { onChange: () => void };

export default function RegisteredWallet({ onChange }: Props) {
  const { charity } = useRegistrationQuery();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full w-full items-center">
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
        onClick={onChange}
        className="btn-outline-secondary uppercase font-heading text-xs px-2 py-1"
      >
        change wallet
      </Button>
      <Button
        className="btn-primary w-80 h-10 mt-8 rounded-xl uppercase font-bold"
        onClick={() => navigate(`${appRoutes.register}/${routes.dashboard}`)}
      >
        Continue
      </Button>
    </div>
  );
}

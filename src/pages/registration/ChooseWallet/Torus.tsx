import gmailIcon from "assets/images/gmail.png";
import { BsDiscord } from "react-icons/bs";
import { FaFacebook, FaTwitch } from "react-icons/fa";
import ButtonSocial from "./ButtonSocial";

export default function Torus() {
  return (
    <div className="flex flex-col justify-between bg-green-500 h-96 w-96 p-4">
      <ButtonSocial
        icon={gmailIcon}
        text="Continue with Google"
        alt="Google"
        onClick={() => console.log("connect with Google")}
      />
      <div className="flex justify-between gap-4">
        <ButtonSocial
          icon={<FaFacebook className="text-angel-blue" size={30} />}
          alt="Facebook"
          onClick={() => console.log("connect with Facebook")}
        />
        <ButtonSocial
          icon={<FaTwitch className="text-purple-500" size={30} />}
          alt="Twitch"
          onClick={() => console.log("connect with Twitch")}
        />
        <ButtonSocial
          icon={<BsDiscord className="text-indigo-400" size={30} />}
          alt="Discord"
          onClick={() => console.log("connect with Discord")}
        />
      </div>
      <Separator />
    </div>
  );
}

function Separator() {
  return (
    <div className="flex gap-3 items-center">
      <span className="h-px w-full bg-white" />
      <span>or</span>
      <span className="h-px w-full bg-white" />
    </div>
  );
}

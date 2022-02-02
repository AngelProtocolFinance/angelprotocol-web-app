import gmailIcon from "assets/images/gmail.png";
import { ChangeEvent, ChangeEventHandler, useCallback } from "react";
import { BsDiscord } from "react-icons/bs";
import { FaFacebook, FaTwitch } from "react-icons/fa";
import ButtonSocial from "./ButtonSocial";

export default function Torus() {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => console.log(event.target.value),
    []
  );

  return (
    <div className="flex flex-col justify-between bg-green-500 h-96 w-96 p-4">
      <ButtonSocial
        className="text-dark-grey"
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
      <InputEmail onChange={handleChange} />
      <ButtonSocial
        className="bg-opacity-40"
        text="Continue with Email"
        onClick={() => console.log("continue with email")}
      />
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

function InputEmail({
  onChange,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <input
      type="string"
      className="flex h-12 w-full justify-center rounded-sm pl-4 outline-none bg-white text-angel-grey text-sm"
      placeholder="Enter your email"
      onChange={onChange}
    />
  );
}

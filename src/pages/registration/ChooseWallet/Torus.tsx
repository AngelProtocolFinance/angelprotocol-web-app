import gmailIcon from "assets/images/gmail.png";
import ButtonSocial from "./ButtonSocial";

export default function Torus() {
  return (
    <div className="flex flex-col justify-between bg-green-500 h-96 w-96 p-3">
      <ButtonSocial
        icon={gmailIcon}
        text="Continue with Google"
        alt="Google"
        onClick={() => console.log("connect with Google")}
      />
    </div>
  );
}

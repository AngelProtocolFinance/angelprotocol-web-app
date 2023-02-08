import placeholderLogo from "assets/images/angelprotocol-rounded-logo.png";
import { useProfileContext } from "./ProfileContext";

const container = "h-48 w-48";

const logoStyle = `${container} border border-prim rounded-full object-cover bg-white`;

export default function Logo() {
  return (
    <div className="padded-container flex justify-center items-center w-full overflow-visible h-0 isolate lg:justify-start">
      <Image />
    </div>
  );
}

function Image() {
  const { logo } = useProfileContext();

  if (!logo) {
    return <img className={logoStyle} alt="logo" src={placeholderLogo} />;
  }

  return <img className={logoStyle} alt="logo" src={logo} />;
}

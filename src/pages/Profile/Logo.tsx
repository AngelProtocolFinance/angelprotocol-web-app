import LogoPlaceholder from "components/LogoPlaceholder";
import { useProfileContext } from "./ProfileContext";

const container = "h-48 w-48";

const logoStyle = `${container} border border-gray-l2 rounded-full object-cover dark:border-bluegray bg-white`;

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
    return <LogoPlaceholder classes={{ container, icon: "w-9 h-9" }} />;
  }

  return <img className={logoStyle} alt="logo" src={logo} />;
}

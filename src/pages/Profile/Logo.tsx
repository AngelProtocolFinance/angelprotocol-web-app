import Icon from "components/Icon";
import { useProfileContext } from "./ProfileContext";

const logoStyle =
  "box-border h-44 w-44 border border-gray-l2 rounded-full object-contain dark:border-bluegray-d1";

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
    return (
      <div
        className={`${logoStyle} flex items-center justify-center bg-blue-l3 dark:bg-blue`}
      >
        <Icon
          type="Picture"
          className="w-9 h-9 bg-blue-l3 text-white dark:bg-blue dark:text-blue-l3"
        />
      </div>
    );
  }

  return <img className={`${logoStyle} bg-white`} alt="logo" src={logo} />;
}

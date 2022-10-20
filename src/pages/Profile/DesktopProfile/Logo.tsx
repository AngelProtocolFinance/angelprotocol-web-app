import Icon from "components/Icon";
import { useLocalContext } from "./LocalContext";

const logoStyle =
  "box-border h-44 w-44 border border-gray-l2 rounded-full dark:border-bluegray-d1";

export default function Logo() {
  const { profile } = useLocalContext();

  if (!profile.logo) {
    return (
      <div className={`${logoStyle} flex items-center justify-center`}>
        <Icon
          type="Picture"
          className="w-9 h-9 bg-blue-l3 text-white dark:bg-blue dark:text-blue-l3"
        />
      </div>
    );
  }

  return (
    <img
      className={`${logoStyle} bg-white object-contain`}
      alt="logo"
      src={profile.logo}
    />
  );
}

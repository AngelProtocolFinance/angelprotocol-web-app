import Icon from "components/Icon";
import { useLocalContext } from "./LocalContext";

const logoStyle =
  "box-border h-40 w-40 sm:h-44 sm:w-44 border border-gray-l2 rounded-full dark:border-bluegray-d1";

type Props = { className?: string };

export default function Logo({ className = "" }: Props) {
  const { logo } = useLocalContext();

  if (!logo) {
    return (
      <div
        className={`${logoStyle} ${className} flex items-center justify-center`}
      >
        <Icon
          type="Picture"
          className="w-9 h-9 bg-blue-l3 text-white dark:bg-blue dark:text-blue-l3"
        />
      </div>
    );
  }

  return (
    <img
      className={`${logoStyle} ${className} bg-white object-contain`}
      alt="logo"
      src={logo}
    />
  );
}

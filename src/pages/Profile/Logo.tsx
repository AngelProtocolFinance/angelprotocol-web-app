import Icon from "components/Icon";
import { useProfileContext } from "./ProfileContext";

const anchorStyle =
  "flex items-center justify-center w-full h-0 overflow-visible isolate lg:justify-start lg:pl-20";

const logoStyle =
  "box-border h-40 w-40 sm:h-44 sm:w-44 border border-gray-l2 rounded-full object-contain dark:border-bluegray-d1";

export default function Logo() {
  const { logo } = useProfileContext();

  if (!logo) {
    return (
      <div className={anchorStyle}>
        <div
          className={`${logoStyle} flex items-center justify-center bg-blue-l3 dark:bg-blue`}
        >
          <Icon
            type="Picture"
            className="w-9 h-9 bg-blue-l3 text-white dark:bg-blue dark:text-blue-l3"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={anchorStyle}>
      <img className={`${logoStyle} bg-white`} alt="logo" src={logo} />
    </div>
  );
}

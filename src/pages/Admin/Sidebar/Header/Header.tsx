import Image from "components/Image";
import { LOGO_DARK, LOGO_LIGHT } from "constant/common";
import { useAdminContext } from "../../Context";
import CharityHeader from "./CharityHeader";

export default function Header() {
  const { type } = useAdminContext();
  return (
    <div
      className={`flex flex-col gap-1 w-full py-6 px-5 border-b border-gray-l3 dark:border-bluegray ${
        type === "ap"
          ? "dark:bg-blue-d4"
          : type === "review"
          ? "dark:bg-bluegray"
          : ""
      }`}
    >
      {type === "charity" ? (
        <CharityHeader />
      ) : (
        <>
          <Image className="w-32 hidden dark:block" {...LOGO_DARK} />
          <Image className="w-32 block dark:hidden" {...LOGO_LIGHT} />
          <h5 className="text-sm dark:text-white  font-bold truncate mt-2">
            {type === "ap"
              ? "Angel Giving Team Admin"
              : "Charity Applications Review"}
          </h5>
        </>
      )}
    </div>
  );
}

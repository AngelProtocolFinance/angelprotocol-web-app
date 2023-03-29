import Image from "components/Image";
import { AP_LOGO, AP_LOGO_LIGHT } from "constants/common";
import { useAdminResources } from "../../Guard";
import CharityHeader from "./CharityHeader";

export default function Header() {
  const { type } = useAdminResources();
  return (
    <div
      className={`flex flex-col gap-1 w-full py-6 px-5 border-b border-prim ${
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
          <Image className="w-32 hidden dark:block" img={AP_LOGO} />
          <Image className="w-32 block dark:hidden" img={AP_LOGO_LIGHT} />
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

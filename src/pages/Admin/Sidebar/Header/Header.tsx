import Image from "components/Image";
import { AP_LOGO } from "constants/common";
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
          <Image className="w-32" img={AP_LOGO} />
          <h5 className="text-sm text-white font-bold truncate mt-2">
            {type === "ap"
              ? "Angel Giving Team Admin"
              : "Charity Applications Review"}
          </h5>
        </>
      )}
    </div>
  );
}

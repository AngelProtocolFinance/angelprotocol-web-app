import Logo from "components/Logo";
import { LOGO } from "constants/common";
import { useAdminResources } from "../../Guard";
import CharityHeader from "./CharityHeader";

export default function Header() {
  const { type } = useAdminResources();
  return (
    <div
      className={`flex flex-col gap-1 w-full py-6 px-5 border-b border-prim ${
        type === "ap"
          ? "bg-orange-l2 dark:bg-blue-d4"
          : type === "review"
          ? "bg-gray-l2 dark:bg-bluegray"
          : ""
      }`}
    >
      {type === "charity" ? (
        <CharityHeader />
      ) : (
        <>
          <Logo className="w-32" logo={LOGO} />
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

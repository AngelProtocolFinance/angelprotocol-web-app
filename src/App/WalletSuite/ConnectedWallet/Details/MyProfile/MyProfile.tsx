import Logo from "../Logo";
import Links from "./Links";

export default function MyProfile() {
  return (
    <div className="grid p-4 gap-3 border-b border-gray-l2 dark:border-bluegray">
      <h3 className="font-heading font-bold text-sm text-gray-d1 dark:text-gray">
        My Profile
      </h3>
      <div className="grid grid-cols-[auto_1fr] gap-3">
        {/* Will be added once possible to fetch endowment profile by wallet address */}
        <Logo src={""} className="w-10 h-10" />
        <div className="grid items-center">
          {/* Will be added once possible to fetch endowment profile by wallet address */}
          {/* <span className="font-heading font-semibold text-sm"> */}
          {/* {"endowment name"} */}
          {/* </span> */}

          <Links />
        </div>
      </div>
    </div>
  );
}

import { EndowmentBookmark } from "types/aws";
import Logo from "../Logo";
import Links from "./Links";

type Props = { endowments?: EndowmentBookmark[] };

export default function MyEndowments({ endowments = [] }: Props) {
  return (
    <div className="grid p-4 gap-3 border-b border-gray-l2 dark:border-bluegray">
      <h3 className="font-heading font-bold text-sm text-gray-d1 dark:text-gray">
        My Endowments
      </h3>
      {endowments.map((e) => (
        <div className="grid grid-cols-[auto_1fr] gap-3">
          <Logo src={e.logo} className="w-10 h-10" />
          <div className="grid items-center">
            {/* Will be added once possible to fetch endowment profile by wallet address */}
            <span className="font-heading font-semibold text-sm">{e.name}</span>

            <Links />
          </div>
        </div>
      ))}
    </div>
  );
}

import { Link } from "react-router-dom";
import { EndowmentBookmark } from "types/aws";
import { appRoutes } from "constants/routes";
import Logo from "../Logo";

type Props = { endowments: EndowmentBookmark[] };

export default function MyEndowments({ endowments }: Props) {
  return (
    <div className="grid p-4 gap-3 border-b border-gray-l2 dark:border-bluegray">
      <h3 className="font-heading font-bold text-sm text-gray-d1 dark:text-gray">
        My Endowments
      </h3>
      {endowments.map((e) => (
        <div key={e.id} className="grid grid-cols-[auto_1fr] gap-3">
          <Logo src={e.logo} className="w-10 h-10" />
          <div className="grid items-center">
            {/* Will be added once possible to fetch endowment profile by wallet address */}
            <span className="font-heading font-semibold text-sm">{e.name}</span>

            <div className="flex items-center uppercase font-heading font-semibold text-xs underline underline-offset-2 decoration-1 text-orange hover:text-orange-l2">
              <Link to={`${appRoutes.profile}/${e.id}`} className="pr-2">
                profile
              </Link>
              <Link
                to={`${appRoutes.admin}/${e.id}`}
                className="px-2 border-l border-gray-l2 dark:border-bluegray"
              >
                admin
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

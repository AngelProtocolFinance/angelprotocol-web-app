import { Link } from "react-router-dom";
import { EndowmentBookmark } from "types/aws";
import Image from "components/Image";
import { IS_AST } from "constants/env";
import { appRoutes } from "constants/routes";

type Props = { endowments: EndowmentBookmark[] };

export default function MyEndowments({ endowments }: Props) {
  return (
    <div className="grid p-2 gap-3">
      <h3 className="text-sm text-gray-d1 dark:text-gray">
        Other {IS_AST ? "Angel Smart Treasuries" : "Endowments"}
      </h3>
      <div className="overflow-y-auto max-h-40 scroller grid gap-3">
        {endowments.map((endowment) => (
          <div
            key={`my-endow-${endowment.endowId}`}
            className="grid grid-cols-[auto_1fr] gap-3"
          >
            <Image
              src={endowment.logo}
              className="w-10 h-10 border border-prim rounded-full"
            />
            <Link
              to={`${appRoutes.admin}/${endowment.endowId}`}
              className="grid items-center"
            >
              <span className="font-heading font-semibold text-sm">
                {endowment.name}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

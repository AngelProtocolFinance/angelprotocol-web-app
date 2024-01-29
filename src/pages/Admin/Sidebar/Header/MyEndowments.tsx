import Image from "components/Image";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { EndowmentBookmark } from "types/aws";

type Props = { endowments: EndowmentBookmark[]; showEndowments: boolean };

export default function MyEndowments({ endowments, showEndowments }: Props) {
  return (
    <div
      className={`${
        showEndowments ? "max-h-56" : "max-h-0"
      } overflow-hidden transition-max-height duration-500 ease-in-out`}
    >
      <div className="grid py-2 mt-5 gap-3">
        <p className="text-sm text-gray-d1 dark:text-gray font-bold">
          Other Organizations
        </p>
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
    </div>
  );
}

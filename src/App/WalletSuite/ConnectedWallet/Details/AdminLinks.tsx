import { Link } from "react-router-dom";
import { AP_ID, REVIEWER_ID } from "services/juno/custom";
import { appRoutes } from "constants/routes";

type Props = { isApMember: boolean; isReviewMember: boolean };

export default function AdminLinks(props: Props) {
  return (
    <div className="grid p-4 gap-3 border-b border-gray-l2 dark:border-bluegray">
      <h3 className="font-heading font-bold text-sm text-gray-d1 dark:text-gray">
        Platform Administration
      </h3>
      <div className="flex items-center uppercase font-heading font-semibold text-xs underline underline-offset-2">
        {props.isApMember && (
          <Link
            to={`${appRoutes.admin}/${AP_ID}`}
            className="pr-2 text-orange hover:text-orange-l2 decoration-1 hover:decoration-2"
          >
            ap admin
          </Link>
        )}
        {props.isReviewMember && (
          <Link
            to={`${appRoutes.admin}/${REVIEWER_ID}`}
            className="pl-2 border-l border-gray-l2 dark:border-bluegray text-orange hover:text-orange-l2 decoration-1 hover:decoration-2"
          >
            applications
          </Link>
        )}
      </div>
    </div>
  );
}

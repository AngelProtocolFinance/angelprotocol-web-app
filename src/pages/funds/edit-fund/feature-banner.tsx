import ExtLink from "components/ext-link";
import { Confirmed, Info } from "components/status";
import { appRoutes } from "constants/routes";

interface Props {
  featured: boolean;
  fundId: string;
  classes?: string;
  onToggle: () => void;
  isToggling: boolean;
}

export function FeatureBanner({ classes = "", ...props }: Props) {
  return (
    <div
      className={`${classes} flex flex-wrap justify-between items-center border rounded-lg p-4 gap-4 ${
        props.featured
          ? "bg-green-l5 border-green-l2"
          : "bg-amber-l5 border-amber-l3"
      }`}
    >
      {props.featured ? (
        <Confirmed>Your fund is visible in the funds page</Confirmed>
      ) : (
        <Info classes="text-amber">
          Your endowment is not visible in the funds page
        </Info>
      )}
      <div className="flex items-center gap-x-2">
        <button
          disabled={props.isToggling}
          onClick={props.onToggle}
          type="button"
          className="text-xs btn-blue px-4 py-2 rounded-full"
        >
          {props.isToggling
            ? "Updating.."
            : props.featured
              ? "Unpublish"
              : "Publish"}
        </button>
        <ExtLink
          href={`${appRoutes.funds}/${props.fundId}`}
          className="text-blue-d1 hover:text-gray-d1 text-sm flex items-center gap-1"
        >
          View
        </ExtLink>
      </div>
    </div>
  );
}

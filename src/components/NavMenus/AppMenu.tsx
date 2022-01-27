import { Link } from "react-router-dom";
import { app } from "types/routes";
import { useRouteMatch } from "react-router-dom";

export default function AppMenu() {
  const { url } = useRouteMatch();

  return (
    <ul className="flex lg:items-center">
      <ListLinkItem to={`${url}/${app.index}`} text="LEADERBOARD" />
      <ListLinkItem to={`${url}/${app.register}`} text="REGISTER" />
      <ListLinkItem to={`${url}/${app.tca}`} text="DONATE" />
    </ul>
  );
}

function ListLinkItem({ to, text }: { to: string; text: string }) {
  return (
    <li>
      <Link
        to={to}
        className="text-white-grey text-sm hover:text-opacity-75 px-1 lg:text-base font-heading uppercase font-semibold lg:px-2"
      >
        {text}
      </Link>
    </li>
  );
}

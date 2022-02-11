import { Link, LinkProps, useRouteMatch } from "react-router-dom";
import { app } from "types/routes";

export default function AppMenu() {
  const { url } = useRouteMatch();

  return (
    <ul className="flex lg:items-center">
      <ListLinkItem to={`${url}/${app.leaderboard}`}>LEADERBOARD</ListLinkItem>
      <ListLinkItem
        rel="noopener noreferer"
        target="_blank"
        to={{ pathname: "https://www.angelprotocol.io/contact" }}
      >
        REGISTER
      </ListLinkItem>
    </ul>
  );
}

function ListLinkItem({ className, ...rest }: LinkProps) {
  return (
    <li>
      <Link
        className={`text-white-grey text-sm hover:text-opacity-75 px-1 lg:text-base font-heading uppercase font-semibold lg:px-2 ${className}`}
        {...rest}
      />
    </li>
  );
}

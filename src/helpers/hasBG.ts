import { Location } from "react-router-dom";
import { appRoutes } from "constants/routes";

export default function hasBg(location: Location) {
  return [
    appRoutes.register2,
    appRoutes.register,
    appRoutes.leaderboard,
    appRoutes.donations,
  ].some((route) => location.pathname.includes(route));
}

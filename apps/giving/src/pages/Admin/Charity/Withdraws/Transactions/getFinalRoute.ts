import { WithdrawLog } from "types/aws";

export function getFinalRoute({ routes = [], num_routes }: WithdrawLog) {
  const currRoute = routes.length;
  if (num_routes && currRoute > 0 && currRoute >= num_routes) {
    return routes[currRoute - 1];
  }
}

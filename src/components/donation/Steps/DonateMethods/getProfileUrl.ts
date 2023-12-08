import { appRoutes } from "constants/routes";

export default function getProfileUrl(endowId: number) {
  return `${window.location.origin}${appRoutes.donate}/${endowId}`;
}

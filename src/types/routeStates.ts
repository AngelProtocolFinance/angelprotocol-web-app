import { Location } from "react-router-dom";

export type SigninRouteState = {
  from: Location;
  routeState?: any;
};

export type WelcomeRouteState = { continue?: boolean };

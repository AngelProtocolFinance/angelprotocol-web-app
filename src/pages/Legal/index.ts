import { appRoutes } from "constants/routes";
import { convert } from "helpers/route";
import type { RouteObject } from "react-router";

export const legalRoutes: RouteObject[] = [
  {
    path: appRoutes.privacy_policy,
    lazy: () => import("./PrivacyPolicy").then(convert),
  },
  {
    path: appRoutes.terms_nonprofits,
    lazy: () => import("./TermsNonprofits").then(convert),
  },
  {
    path: appRoutes.terms_donors,
    lazy: () => import("./TermsDonors").then(convert),
  },
];

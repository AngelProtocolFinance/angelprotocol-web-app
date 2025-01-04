import type { RouteObject } from "@remix-run/react";
import { appRoutes } from "constants/routes";
import { convert } from "helpers/route";

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

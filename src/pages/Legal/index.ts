import { appRoutes } from "constants/routes";
import type { RouteObject } from "react-router-dom";

export const legalRoutes: RouteObject[] = [
  { path: appRoutes.privacy_policy, lazy: () => import("./PrivacyPolicy") },
  { path: appRoutes.terms_nonprofits, lazy: () => import("./TermsNonprofits") },
  { path: appRoutes.terms_donors, lazy: () => import("./TermsDonors") },
];

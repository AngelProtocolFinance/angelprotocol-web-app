import { convert } from "helpers/route";
import { Navigate, type RouteObject } from "react-router";
import { steps } from "../routes";

export const route: RouteObject = {
  lazy: () => import("./steps-layout").then(convert),
  children: [
    {
      path: steps.contact,
      lazy: () => import("./ContactDetails").then(convert),
    },
    {
      path: steps.orgDetails,
      lazy: () => import("./OrgDetails").then(convert),
    },
    {
      path: steps.fsaInquiry,
      lazy: () => import("./FSAInquiry").then(convert),
    },
    {
      path: steps.docs,
      lazy: () => import("./Documentation").then(convert),
      children: [
        { path: "fsa", lazy: () => import("../data/fsa-action").then(convert) },
      ],
    },
    { path: steps.banking, lazy: () => import("./Banking").then(convert) },
    {
      path: steps.summary,
      lazy: () => import("./Dashboard").then(convert),
    },
    { index: true, element: <Navigate to={steps.contact} /> },
  ],
};

import { PromptV2 } from "components/Prompt/PromptV2";
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
      children: [
        {
          path: "success",
          element: (
            <PromptV2
              type="success"
              children="Your application has been submitted. We will get back to you soon!"
            />
          ),
        },
      ],
    },
    { index: true, element: <Navigate to={steps.contact} /> },
  ],
};

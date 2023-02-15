import { AdminRoutes } from "constants/routes";

export type LayoutProps = {
  linkGroups: LinkGroup[];
};

export type LinkGroup = { title?: string; links: AdminRoutes[] };

import { app, site } from "constants/routes";
import { CharityNavProps } from "./types";

export const charityNav: CharityNavProps[] = [
  {
    title: "overview",
    disabled: false,
    getLink: (address: string) =>
      `${site.app}/${app.charity}/${address}/overview`,
    isDefault: true,
    defaultPath: (address: string) => `${site.app}/${app.charity}/${address}`,
  },
  {
    title: "endowment",
    disabled: false,
    getLink: (address: string) =>
      `${site.app}/${app.charity}/${address}/endowment`,
    defaultPath: (address: string) => `${site.app}/${app.charity}/${address}`,
  },
  {
    title: "programs",
    disabled: true,
    getLink: (address: string) =>
      `${site.app}/${app.charity}/${address}/programs`,
    defaultPath: (address: string) => `${site.app}/${app.charity}/${address}`,
  },
  {
    title: "media",
    disabled: true,
    getLink: (address: string) => `${site.app}/${app.charity}/${address}/media`,
    defaultPath: (address: string) => `${site.app}/${app.charity}/${address}`,
  },
  {
    title: "governance",
    disabled: true,
    getLink: (address: string) =>
      `${site.app}/${app.charity}/${address}/governance`,
    defaultPath: (address: string) => `${site.app}/${app.charity}/${address}`,
  },
];

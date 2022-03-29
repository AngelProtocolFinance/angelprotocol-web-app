import { app, charity, site } from "constants/routes";
import { CharityNavProps } from "./types";

export const charityNav: CharityNavProps[] = [
  {
    title: "overview",
    disabled: false,
    getLink: (address: string) =>
      `${site.app}/${app.charity}/${address}${charity.overview}`,
    isDefault: true,
    defaultPath: (address: string) => `${site.app}/${app.charity}/${address}`,
  },
  {
    title: "endowment",
    disabled: false,
    getLink: (address: string) =>
      `${site.app}/${app.charity}/${address}${charity.endowment}`,
    defaultPath: (address: string) => `${site.app}/${app.charity}/${address}`,
  },
  {
    title: "programs",
    disabled: true,
    getLink: (address: string) =>
      `${site.app}/${app.charity}/${address}${charity.programs}`,
    defaultPath: (address: string) => `${site.app}/${app.charity}/${address}`,
  },
  {
    title: "media",
    disabled: true,
    getLink: (address: string) =>
      `${site.app}/${app.charity}/${address}${charity.media}`,
    defaultPath: (address: string) => `${site.app}/${app.charity}/${address}`,
  },
  {
    title: "governance",
    disabled: true,
    getLink: (address: string) =>
      `${site.app}/${app.charity}/${address}${charity.governance}`,
    defaultPath: (address: string) => `${site.app}/${app.charity}/${address}`,
  },
];

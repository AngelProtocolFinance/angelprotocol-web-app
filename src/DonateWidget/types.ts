import { ConfigParams } from "components/donation/Steps";

export type UrlParamValues = Required<Omit<ConfigParams, "availCurrs">> &
  Pick<ConfigParams, "availCurrs"> & { hideText: boolean };

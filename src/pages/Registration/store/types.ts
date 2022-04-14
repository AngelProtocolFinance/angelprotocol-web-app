import { CharityData } from "services/aws/types";

export type User = CharityData & { token?: string };

export enum UserTypes {
  CHARITY_OWNER = "charity-owner",
  WEB_APP = "angelprotocol-web-app",
}

import type { IUserNpo } from "@better-giving/user";

export type UserAttributes = {
  familyName: string;
  givenName: string;
  prefCurrencyCode?: string;
  avatarUrl?: string;
};

export type UserUpdate = Partial<UserAttributes>;

export type INpoBookmark = {
  id: number;
  name: string;
  logo?: string;
};

export interface IUserNpo2 extends IUserNpo {
  name: string;
  logo?: string;
}

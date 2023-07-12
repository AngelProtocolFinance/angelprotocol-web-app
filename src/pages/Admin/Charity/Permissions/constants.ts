import { TPermission } from "./types";

export const keys: { [K in keyof TPermission]: K } = {
  addr: "addr",
  delegated: "delegated",
  expires: "expires",
  expiry: "expiry",
  locked: "locked",

  modifiable: "modifiable",
  ownerControlled: "ownerControlled",
  govControlled: "govControlled",
};

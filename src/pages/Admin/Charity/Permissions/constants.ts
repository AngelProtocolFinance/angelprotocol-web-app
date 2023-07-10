import { TPermission } from "./types";

export const keys: { [K in keyof TPermission]: K } = {
  addr: "addr",
  delegated: "delegated",
  locked: "locked",
  modifiable: "modifiable",
  ownerControlled: "ownerControlled",
  govControlled: "govControlled",
};

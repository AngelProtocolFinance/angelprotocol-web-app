import crypto from "node:crypto";
import type { DbRecord } from "@better-giving/registration/db";
import type { NewReg } from "@better-giving/registration/update";
import type { Environment } from "@better-giving/types/list";
import { putItem } from "./helpers";

export async function createRegistration(
  init: NewReg,
  environment: Environment
) {
  const created = new Date().toISOString();
  const id = crypto.randomUUID();
  const item: DbRecord = {
    PK: `Reg#${id}`,
    SK: `Reg#${id}`,
    id,
    registrant_id: init.registrant_id,
    claim: init.claim,
    referrer: init.referrer,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    update_type: "init",
    env: environment,
    status: "01",
    gsi1PK: `UserReg#${init.registrant_id}`,
    gsi1SK: `${created}#01`,
    gsi2PK: `Regs#${environment}`,
    gsi2SK: `01#${environment}`,
  };
  return putItem(item).then((res) => res.id);
}

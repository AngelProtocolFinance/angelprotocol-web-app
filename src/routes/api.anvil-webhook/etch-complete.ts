import type { IRegUpdate } from "@better-giving/reg";
import { signer_fn } from "./helpers";
import type { EtchPacket } from "./types";
import { regdb } from ".server/aws/db";

export const etch_complete = async (
  data: EtchPacket.Data,
  base_url: string
) => {
  const { signers, documentGroup } = data;
  const signer = await signer_fn(signers[0].eid);
  const id = signer.eid;

  const prev = await regdb.reg(id);
  if (!prev) throw `reg not found for ${id}`;

  const upd8: IRegUpdate = {
    $o_type: "other",
    $o_fsa_signed_doc_url: `${base_url}/api/anvil-doc/${documentGroup.eid}`,
    update_type: "docs",
  };

  return regdb.reg_update(id, prev, upd8);
};

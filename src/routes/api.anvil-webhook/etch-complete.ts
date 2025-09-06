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

  const res = await regdb.reg_update(id, {
    o_fsa_signed_doc_url: `${base_url}/api/anvil-doc/${documentGroup.eid}`,
    status: "01",
  });
  return res.o_fsa_signed_doc_url;
};

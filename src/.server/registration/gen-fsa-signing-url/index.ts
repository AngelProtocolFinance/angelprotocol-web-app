import type { FsaPayload } from "@better-giving/registration/fsa";
import { anvil } from "../../sdks";
import { etch_eids } from "./etch-eids";
import { fsa_signer } from "./fsa-signer";
import { save_docs } from "./save-docs.js";

export const gen_fsa_signing_url = async (
  payload: FsaPayload
): Promise<string> => {
  const signer =
    typeof payload.signer === "string"
      ? await fsa_signer(payload.signer)
      : payload.signer;

  const eids = await etch_eids(
    typeof payload.signer === "string"
      ? await fsa_signer(payload.signer)
      : payload.signer,
    payload.redirectUrl
  );

  const etch = await anvil.generateEtchSignUrl({
    variables: { signerEid: eids.signer, clientUserId: signer.id },
  });

  if (!etch.url) throw `Etch URL not generated for signer ${signer.id}`;

  const url = await save_docs(signer.id, signer.docs, etch.url);
  return url;
};

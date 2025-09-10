import type { IFsaSigner } from "@better-giving/reg";
import { anvil } from "../../sdks";
import { etch_eids } from "./etch-eids";

export const gen_fsa_signing_url = async (
  reg_id: string,
  signer: IFsaSigner,
  redirect_url: string
): Promise<string> => {
  const eids = await etch_eids(reg_id, signer, redirect_url);
  const etch = await anvil.generateEtchSignUrl({
    variables: { signerEid: eids.signer, clientUserId: reg_id },
  });

  if (!etch.url) throw `Etch URL not generated for signer ${reg_id}`;
  return etch.url;
};

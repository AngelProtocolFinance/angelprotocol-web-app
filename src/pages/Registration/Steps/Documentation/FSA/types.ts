import type { FsaDocs } from "@better-giving/registration/models";
import type { Except, OverrideProperties } from "type-fest";
import type { FileDropzoneAsset } from "types/components";

export type FormValues = OverrideProperties<
  Except<FsaDocs, "fsa_signing_url" | "fsa_signed_doc_url">,
  {
    proof_of_identity: FileDropzoneAsset;
    proof_of_reg: FileDropzoneAsset;
  }
>;

export type Props = {
  doc: FsaDocs | undefined;
};

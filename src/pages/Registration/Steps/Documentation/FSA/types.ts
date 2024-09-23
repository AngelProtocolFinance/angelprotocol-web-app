import type { Except, OverrideProperties } from "type-fest";
import type { RegV2 } from "types/aws";
import type { FileDropzoneAsset } from "types/components";

export type FormValues = OverrideProperties<
  Except<RegV2.FsaDocs, "fsa_signing_url" | "fsa_signed_doc_url">,
  {
    proof_of_identity: FileDropzoneAsset;
    proof_of_reg: FileDropzoneAsset;
  }
>;

export type Props = {
  doc: RegV2.FsaDocs | undefined;
};

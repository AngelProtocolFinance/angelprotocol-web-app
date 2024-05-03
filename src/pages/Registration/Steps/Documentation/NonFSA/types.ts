import type { Except } from "type-fest";
import type { NonFSADocumentation } from "types/aws";

export type FormValues = Except<NonFSADocumentation, "DocType" | "Claim">;

export type Props = {
  doc: NonFSADocumentation | undefined;
};

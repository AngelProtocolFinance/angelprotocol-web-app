import { Except } from "type-fest";
import { NonFSADocumentation } from "types/aws";

export type FormValues = Except<NonFSADocumentation, "DocType">;

export type Props = {
  doc: NonFSADocumentation | undefined;
};

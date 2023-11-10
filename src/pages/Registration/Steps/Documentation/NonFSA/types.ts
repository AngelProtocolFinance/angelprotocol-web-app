import { Except } from "type-fest";
import { InitReg } from "../../../types";
import { NonFSADocumentation } from "types/aws";

export type FormValues = Except<NonFSADocumentation, "DocType">;

export type Props = {
  doc: NonFSADocumentation | undefined;
  init: InitReg;
  orgName: string;
  thisStep: number;
};

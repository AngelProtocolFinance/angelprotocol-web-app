import { UpdateProfilePayload } from "contracts/types";
import {
  ProposalBase,
  proposalShape,
} from "pages/Admin/Templates/proposalShape";
import { SchemaShape } from "types/schema";
import * as Yup from "yup";

export type UpdateProfileValues = ProposalBase &
  UpdateProfilePayload & { initialProfile: UpdateProfilePayload };

//construct strict shape to avoid hardcoding shape keys
const profileEditShape: SchemaShape<UpdateProfileValues> = {
  ...proposalShape,
};

export const profileEditSchema = Yup.object().shape(profileEditShape);

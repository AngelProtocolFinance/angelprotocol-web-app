import { UpdateProfilePayload } from "types/server/contracts";
import { ProposalBase } from "pages/Admin/types";

export type EndowmentAdminParams = { address: string };
export type UpdateProfileValues = ProposalBase &
  UpdateProfilePayload & { initialProfile: UpdateProfilePayload };

import { ProposalBase } from "pages/Admin/types";
import { UpdateProfilePayload } from "types/server/contracts";

export type EndowmentAdminParams = { address: string };
export type UpdateProfileValues = ProposalBase &
  UpdateProfilePayload & { initialProfile: UpdateProfilePayload };
